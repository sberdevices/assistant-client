import { createNanoEvents } from '../../nanoevents';
import { SystemMessageDataType, OriginalMessageType, MessageNames, AppInfo } from '../../typings';

import { BatchableMethods, createProtocol } from './protocol';

export interface ClientEvents {
    voice: (voice: Uint8Array, original: OriginalMessageType) => void;
    status: (status: OriginalMessageType['status'], original: OriginalMessageType) => void;
    systemMessage: (systemMessage: SystemMessageDataType, original: OriginalMessageType) => void;
}

export type SystemMessage = SystemMessageDataType & {
    messageId: string;
    messageName: OriginalMessageType[];
};

export const createClient = (
    protocol: ReturnType<typeof createProtocol>,
    provideMeta: (() => Promise<Partial<Pick<SystemMessageDataType, 'app_info' | 'meta'>>>) | undefined = undefined,
) => {
    const { on, emit } = createNanoEvents<ClientEvents>();

    /** ждет ответ бека и возвращает данные из этого ответа */
    const waitForAnswer = (messageId: number | Long): Promise<SystemMessageDataType> =>
        new Promise((resolve) => {
            const off = on('systemMessage', (systemMessageData, originalMessage) => {
                if (
                    originalMessage.messageId === messageId &&
                    (originalMessage.messageName === MessageNames.ANSWER_TO_USER ||
                        originalMessage.messageName === MessageNames.DO_NOTHING)
                ) {
                    off();
                    resolve(systemMessageData);
                }
            });
        });

    /** отправляет произвольный systemMessage, не подкладывает мету */
    const sendData = (data: Record<string, unknown>, messageName = ''): number | Long => {
        const messageId = protocol.getMessageId();

        protocol.sendSystemMessage(
            {
                data,
                messageName,
            },
            true,
            messageId,
        );

        return messageId;
    };

    /** отправляет cancel на сообщение */
    const sendCancel = (messageId: number): void => {
        protocol.sendCancel({}, true, messageId);
    };

    /** отправляет приветствие */
    const sendOpenAssistant = async (
        { isFirstSession }: { isFirstSession: boolean } = { isFirstSession: false },
    ): Promise<SystemMessageDataType> => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const data = isFirstSession ? { is_first_session: true } : {};
        const meta = provideMeta ? await provideMeta() : {};

        return waitForAnswer(sendData({ ...meta, ...data }, 'OPEN_ASSISTANT'));
    };

    /** вызывает sendSystemMessage, куда подкладывает мету */
    const sendMeta = async (
        sendSystemMessage: (data: { data: Record<string, unknown>; messageName?: string }, last: boolean) => void,
    ) => {
        const meta = provideMeta ? await provideMeta() : {};

        if (Object.keys(meta).length) {
            sendSystemMessage(
                {
                    data: meta,
                    messageName: '',
                },
                false,
            );
        }
    };

    /** отправляет server_action и мету */
    const sendServerAction = async (
        serverAction: unknown,
        appInfo: AppInfo,
        messageName = 'SERVER_ACTION',
    ): Promise<number | Long | undefined> => {
        const messageId = protocol.getMessageId();

        // мету и server_action отправляем в одном systemMessage
        await sendMeta(({ data }) => {
            protocol.sendSystemMessage(
                {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    data: { ...data, app_info: appInfo, server_action: serverAction },
                    messageName: messageName || 'SERVER_ACTION',
                },
                true,
                messageId,
            );
        });

        return messageId;
    };

    /** отправляет текст и текущую мету */
    const sendText = async (
        text: string,
        isSsml = false,
        shouldSendDisableDubbing?: boolean,
    ): Promise<number | Long | undefined> => {
        if (text.trim() === '') {
            return undefined;
        }

        return protocol.batch(async ({ sendSystemMessage, sendText: clientSendText, sendSettings, messageId }) => {
            await sendMeta(sendSystemMessage);
            const prevDubbing = protocol.configuration.settings.dubbing;
            const sendDisableDubbing = prevDubbing !== -1 && shouldSendDisableDubbing;

            if (sendDisableDubbing) {
                await sendSettings({ dubbing: -1 }, false);
            }

            isSsml ? clientSendText(text, {}, 'application/ssml') : clientSendText(text, {});

            if (sendDisableDubbing) {
                sendSettings({ dubbing: prevDubbing });
            }

            return messageId;
        });
    };

    /** инициализирует исходящий голосовой поток, факт. передает в callback параметры для отправки голоса,
     * отправляет мету */
    const createVoiceStream = (
        callback: ({
            messageId,
            sendVoice,
            onMessage,
        }: Pick<BatchableMethods, 'messageId' | 'sendVoice'> & {
            onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
        }) => Promise<void>,
    ): Promise<void> =>
        protocol.batch(async ({ sendSystemMessage, sendVoice, messageId }) => {
            await callback({
                sendVoice,
                messageId,
                onMessage: (cb: (message: OriginalMessageType) => void) => protocol.on('incoming', cb),
            });

            sendMeta(sendSystemMessage);
        });

    const off = protocol.on('incoming', (message: OriginalMessageType) => {
        if (message.voice) {
            emit('voice', message.voice.data || new Uint8Array(), message);
        }

        if (message.systemMessage?.data) {
            emit('systemMessage', JSON.parse(message.systemMessage.data), message);
        }

        if (message.status) {
            emit('status', message.status, message);
        }
    });

    return {
        destroy: () => {
            off();
        },
        createVoiceStream,
        sendData,
        sendMeta,
        sendOpenAssistant,
        sendServerAction,
        sendText,
        sendCancel,
        on,
        waitForAnswer,
    };
};

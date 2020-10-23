import {
    Message,
    Settings,
    SystemMessage,
    Device,
    IDevice,
    ISettings,
    Text,
    Voice,
    LegacyDevice,
    ILegacyDevice,
    InitialSettings,
    IInitialSettings,
} from './proto';
import { PacketWrapperFromServer } from './asr';
import { EventsType, SystemMessageDataType, VpsVersion, CreateClientDataType, ClientLogger } from './typings';
import { createNanoEvents } from './nanoevents';
import { createVoicePlayer } from './createVoicePlayer';

export const MESSAGE_NAMES = {
    ANSWER_TO_USER: 'ANSWER_TO_USER',
    STT: 'STT',
};

export const appendHeader = (buffer: Uint8Array) => {
    // Добавляем 4 байта в начало с длинной сообщения
    const arrayBuffer = new ArrayBuffer(4);
    const dataView = new DataView(arrayBuffer, 0);
    dataView.setInt32(0, buffer.length, true);
    const uint8Array = new Uint8Array(4 + buffer.length);
    uint8Array.set(new Uint8Array(arrayBuffer));
    uint8Array.set(buffer, 4);

    return uint8Array;
};

const compileBasePayload = ({
    userId,
    token,
    userChannel,
    version,
    messageName,
    vpsToken,
}: {
    userId: string;
    token: string;
    userChannel: string;
    version: VpsVersion;
    messageName?: string;
    vpsToken?: string;
}) => {
    if (version < 3) {
        return {
            userId,
            token,
            userChannel,
            messageName,
            vpsToken,
            version,
        };
    }

    return {
        token,
        messageName,
        version,
    };
};

export const createClient = (clientParams: CreateClientDataType, logger?: ClientLogger) => {
    const {
        url,
        userId,
        token,
        userChannel,
        locale,
        device,
        settings,
        legacyDevice,
        version,
        messageName,
        vpsToken,
    } = clientParams;
    const basePayload = compileBasePayload({ userId, token, messageName, vpsToken, userChannel, version });

    let status: 'connecting' | 'ready' | 'closed' = 'connecting';

    const messageQueue: Array<Uint8Array> = [];

    const { on, emit, once } = createNanoEvents<EventsType>();

    const pendingMessages: Map<any, Array<Message>> = new Map();
    const commitedMessages: Map<any, Array<Message>> = new Map();

    let currentSettings = { device, legacyDevice, settings, locale };
    let currentMessageId = Date.now();
    let retries = 0;
    let destroyed = false;
    let ws: WebSocket;
    let timeOut: number | undefined;
    let clearRetryTimer: number;

    const voicePlayer = createVoicePlayer();

    const getMessageId = () => {
        return currentMessageId++;
    };

    const waitForAnswerToUser = (messageId: number): Promise<SystemMessageDataType> => {
        return new Promise((resolve) => {
            const off = on('systemMessage', (systemMessageData, originalMessage) => {
                if (
                    originalMessage.messageId === messageId &&
                    originalMessage.messageName === MESSAGE_NAMES.ANSWER_TO_USER
                ) {
                    off();
                    resolve(systemMessageData);
                }
            });
        });
    };

    const send = ({
        payload,
        messageId,
        ...other
    }: {
        payload: (
            | { settings: Settings }
            | { device: Device }
            | { systemMessage: SystemMessage }
            | { text: Text }
            | { voice: Voice }
            | { legacyDevice: LegacyDevice }
            | { initialSettings: InitialSettings }
        ) & {
            last: 1 | -1;
            messageName?: string;
        };
        messageId: number;
    }) => {
        const message = Message.create({
            messageName: '',
            // vpsToken: '',
            ...basePayload,
            ...payload,
            messageId,
            ...other,
        });

        const buffer = Message.encode(message).finish();
        const bufferWithHeader = appendHeader(buffer);

        logger?.logOutcoming(message);

        emit('outcoming', message);

        if (status === 'ready') {
            ws.send(bufferWithHeader);
        } else {
            messageQueue.push(bufferWithHeader);
        }
    };

    const sendDevice = (data: IDevice, last = true, messageId = getMessageId()) => {
        currentSettings = { ...currentSettings, device: data };

        return send({
            payload: {
                device: Device.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendInitialSettings = (data: IInitialSettings, last = true, messageId = getMessageId()) => {
        if (data.device && data.settings) {
            currentSettings = {
                ...currentSettings,
                device: data.device,
                settings: data.settings,
                locale: data.locale || undefined,
            };
        }

        return send({
            payload: {
                initialSettings: InitialSettings.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendLegacyDevice = (data: ILegacyDevice, last = true, messageId = getMessageId()) => {
        currentSettings = { ...currentSettings, legacyDevice: data };

        return send({
            payload: {
                legacyDevice: LegacyDevice.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendSettings = (data: ISettings, last = true, messageId = getMessageId()) => {
        currentSettings = { ...currentSettings, settings: data };

        return send({
            payload: {
                settings: Settings.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendText = (
        data: string,
        params: {
            messageId?: number;
            last?: 1 | -1;
            messageName?: string;
            vpsToken?: string;
            userId?: string;
            token?: string;
            userChannel?: string;
            version?: VpsVersion;
        } = {},
        type = '',
        messageId = getMessageId(),
    ) => {
        const text = type ? { data, type } : { data };
        send({
            payload: {
                text: Text.create(text),
                last: params.last ?? 1,
            },
            messageId,
            ...params,
        });

        return waitForAnswerToUser(messageId);
    };

    const createVoiceStream = (meta?: Record<string, any>, messageId = getMessageId()) => {
        let hasFinished = false;

        type voiceStreamEvents = {
            stt: (text: string, last: boolean) => void;
        };

        const voiceStreamEM = createNanoEvents<voiceStreamEvents>();

        const write = (data: ArrayBuffer, last = false) => {
            if (!hasFinished) {
                send({
                    payload: {
                        voice: Voice.create({
                            data: new Uint8Array(data),
                        }),
                        last: -1,
                    },
                    messageId,
                });

                hasFinished = last;
            }
        };

        meta &&
            send({
                payload: { systemMessage: SystemMessage.create({ data: JSON.stringify(meta) }), last: -1 },
                messageId,
            });

        on('message', (message) => {
            if (message.status && message.status.code != null && message.status.code < 0) {
                hasFinished = true;
            }

            if (message.messageId === messageId && message.messageName === MESSAGE_NAMES.STT) {
                if (message.last === 1) {
                    hasFinished = true;
                    send({ payload: { voice: Voice.create(), last: 1 }, messageId });
                }

                if (message.text) {
                    voiceStreamEM.emit('stt', message.text.data || '', message.last === 1);
                }

                if (message.bytes?.data) {
                    const { decoderResultField } = PacketWrapperFromServer.decode(message.bytes.data);

                    if (decoderResultField && decoderResultField.hypothesis?.length) {
                        voiceStreamEM.emit(
                            'stt',
                            decoderResultField.hypothesis[0].normalizedText || '',
                            !!decoderResultField.isFinal,
                        );
                    }
                }
            }
        });

        return {
            write,
            answerToUser: waitForAnswerToUser(messageId),
            on: voiceStreamEM.on,
        };
    };

    const sendSystemMessage = (
        { data, messageName = '' }: { data: Record<string, any>; messageName?: string },
        last = true,
        messageId = getMessageId(),
    ) => {
        send({
            payload: {
                systemMessage: SystemMessage.create({
                    data: JSON.stringify(data),
                }),
                messageName,
                last: last ? 1 : -1,
            },
            messageId,
        });

        return waitForAnswerToUser(messageId);
    };

    const updateDefauls = (obj: Partial<typeof basePayload>) => {
        Object.assign(basePayload, obj);
    };

    const destroy = () => {
        destroyed = true;
        ws && ws.close();
        clearTimeout(timeOut);
        timeOut = undefined;
    };

    const startWebSocket = () => {
        status = 'connecting';
        setTimeout(() => {
            emit('connecting');
        }, 0);
        ws = new WebSocket(url);

        ws.binaryType = 'arraybuffer';
        ws.addEventListener('open', () => {
            status = 'ready';
            clearRetryTimer = setTimeout(() => {
                retries = 0;
            }, 500);
            if (ws.readyState === 1) {
                if (version < 3) {
                    if (version === 1 && currentSettings.legacyDevice) {
                        sendLegacyDevice(currentSettings.legacyDevice);
                    } else if (version === 2 && currentSettings.device) {
                        sendDevice(currentSettings.device);
                    }
                    sendSettings(currentSettings.settings);
                } else {
                    sendInitialSettings({
                        userId,
                        userChannel,
                        device: currentSettings.device,
                        settings: currentSettings.settings,
                        locale: version > 3 ? currentSettings.locale : undefined,
                    });
                }

                logger?.logInit({ ...clientParams, ...currentSettings });

                while (messageQueue.length > 0) {
                    const message = messageQueue.shift();
                    ws.send(message!);
                }
            }

            emit('ready');
        });

        ws.addEventListener('close', () => {
            status = 'closed';
            clearTimeout(clearRetryTimer);
            if (!ws || (ws.readyState === 3 && !destroyed)) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                timeOut = setTimeout(() => {
                    startWebSocket();
                    retries++;
                }, 300 * retries);
            }

            emit('close');
        });

        ws.addEventListener('message', (e) => {
            const message = Message.decode(new Uint8Array(e.data).slice(4));

            const messages = pendingMessages.get(message.messageId) || [];

            logger?.logIncoming(message);

            messages.push(message);

            if (message.voice?.data?.length) voicePlayer.streamToDataToPlayer(message.voice.data);
            if (message.last === 1) {
                commitedMessages.set(message.messageId, messages);
                pendingMessages.delete(message.messageId);
            } else {
                pendingMessages.set(message.messageId, messages);
            }

            emit('message', message);

            if (message.systemMessage?.data) {
                const systemMessage = JSON.parse(message.systemMessage.data);
                emit('systemMessage', systemMessage, message);
            }
        });
    };

    startWebSocket();

    type BatchableMethods = {
        sendDevice: typeof sendDevice;
        sendLegacyDevice: typeof sendLegacyDevice;
        sendSettings: typeof sendSettings;
        sendInitialSettings: typeof sendInitialSettings;
        send: typeof send;
        sendText: typeof sendText;
        createVoiceStream: typeof createVoiceStream;
        sendSystemMessage: typeof sendSystemMessage;
    };

    const batch = <T>(cb: (methods: BatchableMethods) => T): T => {
        const batchingMessageId = getMessageId();
        let lastMessageSent = false;
        const checkLastMessageStatus = (last?: boolean) => {
            if (lastMessageSent) {
                if (last) {
                    throw new Error("Can't send two last items in batch");
                } else {
                    throw new Error("Can't send messages in batch after last message have been sent");
                }
            } else if (last) {
                lastMessageSent = true;
            }
        };

        const threeParamsMethods = Object.entries({
            sendDevice,
            sendSettings,
            sendInitialSettings,
            sendLegacyDevice,
        }).reduce((acc, curr) => {
            const key = curr[0] as 'sendDevice' | 'sendSettings' | 'sendInitialSettings' | 'sendLegacyDevice';
            acc[key] = (...params: Parameters<typeof curr[1]>) => {
                checkLastMessageStatus(params[1]);
                return curr[1](params[0], params[1], batchingMessageId);
            };
            return acc;
        }, {} as Pick<BatchableMethods, 'sendDevice' | 'sendSettings' | 'sendInitialSettings' | 'sendLegacyDevice'>);
        const upgradedSend: typeof send = (params) => {
            checkLastMessageStatus(params.payload.last === 1);
            return send({ ...params, messageId: batchingMessageId });
        };

        const upgradedSendText: typeof sendText = (...[data, params, type]) => {
            checkLastMessageStatus(params?.last === 1);
            return sendText(data, params, type, batchingMessageId);
        };

        const upgradedCreateVoiceStream: typeof createVoiceStream = (meta) => {
            const stream = createVoiceStream(meta, batchingMessageId);

            return {
                ...stream,
                write: (data, last) => {
                    checkLastMessageStatus(last);
                    return stream.write(data, last);
                },
            };
        };

        const upgradedSendSystemMessage: typeof sendSystemMessage = (data, last) => {
            checkLastMessageStatus(last);
            return sendSystemMessage(data, last, batchingMessageId);
        };

        return cb({
            ...threeParamsMethods,
            send: upgradedSend,
            sendText: upgradedSendText,
            createVoiceStream: upgradedCreateVoiceStream,
            sendSystemMessage: upgradedSendSystemMessage,
        });
    };

    return {
        once,
        send,
        sendDevice,
        sendLegacyDevice,
        sendSettings,
        sendText,
        createVoiceStream,
        sendSystemMessage,
        on,
        updateDefauls,
        destroy,
        batch,
        get currentMessageId() {
            return currentMessageId;
        },
    };
};

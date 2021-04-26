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
import { SystemMessageDataType, VpsVersion } from './typings';

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

export const createClientMethods = (
    {
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
    },
    {
        getMessageId,
        sendMessage,
        waitForAnswerToUser,
    }: {
        getMessageId: () => number;
        sendMessage: (message: Message, buffer: Uint8Array) => void;
        waitForAnswerToUser: (messageId: number) => Promise<SystemMessageDataType>;
    },
) => {
    const basePayload = compileBasePayload({ userId, token, messageName, vpsToken, userChannel, version });

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
            meta?: { [k: string]: string };
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

        sendMessage(message, bufferWithHeader);
    };

    const sendDevice = (data: IDevice, last = true, messageId = getMessageId()) => {
        return send({
            payload: {
                device: Device.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendInitialSettings = (
        data: IInitialSettings,
        last = true,
        messageId = getMessageId(),
        params: { meta?: { [k: string]: string } } = {},
    ) => {
        return send({
            payload: {
                initialSettings: InitialSettings.create(data),
                last: last ? 1 : -1,
                ...params,
            },
            messageId,
        });
    };

    const sendLegacyDevice = (data: ILegacyDevice, last = true, messageId = getMessageId()) => {
        return send({
            payload: {
                legacyDevice: LegacyDevice.create(data),
                last: last ? 1 : -1,
            },
            messageId,
        });
    };

    const sendSettings = (data: ISettings, last = true, messageId = getMessageId()) => {
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
            meta?: { [k: string]: string };
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

    const sendSystemMessage = (
        { data, messageName: mesName = '' }: { data: unknown; messageName?: string },
        last = true,
        messageId = getMessageId(),
        params: {
            meta?: { [k: string]: string };
        } = {},
    ) => {
        send({
            payload: {
                systemMessage: SystemMessage.create({
                    data: JSON.stringify(data),
                }),
                messageName: mesName,
                last: last ? 1 : -1,
                ...params,
            },
            messageId,
        });

        return waitForAnswerToUser(messageId);
    };

    const sendVoice = (
        data: Uint8Array,
        last = true,
        messageId = getMessageId(),
        mesName?: string,
        params: {
            meta?: { [k: string]: string };
        } = {},
    ) => {
        return send({
            payload: {
                voice: Voice.create({
                    data: new Uint8Array(data),
                }),
                messageName: mesName,
                last: last ? 1 : -1,
                ...params,
            },
            messageId,
        });
    };

    const updateDefaults = (obj: Partial<typeof basePayload>) => {
        Object.assign(basePayload, obj);
    };

    type BatchableMethods = {
        sendDevice: typeof sendDevice;
        sendLegacyDevice: typeof sendLegacyDevice;
        sendSettings: typeof sendSettings;
        sendInitialSettings: typeof sendInitialSettings;
        send: typeof send;
        sendText: typeof sendText;
        sendSystemMessage: (
            data: { data: unknown; messageName?: string },
            last: boolean,
            params?: {
                meta?: { [k: string]: string };
            },
        ) => void;
        sendVoice: (
            data: Uint8Array,
            last: boolean,
            messageName?: string,
            params?: {
                meta?: { [k: string]: string };
            },
        ) => void;
        messageId: number;
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

        const upgradedSendSystemMessage: (
            data: { data: unknown; messageName?: string },
            last: boolean,
            params?: {
                meta?: { [k: string]: string };
            },
        ) => void = (data, last, params) => {
            checkLastMessageStatus(last);
            return sendSystemMessage(data, last, batchingMessageId, params);
        };

        const upgradedSendVoice: (
            data: Uint8Array,
            last: boolean,
            messageName?: string,
            params?: {
                meta?: { [k: string]: string };
            },
        ) => void = (data, last, mesName, params) => {
            checkLastMessageStatus(last);
            return sendVoice(data, last, batchingMessageId, mesName, params);
        };

        return cb({
            ...threeParamsMethods,
            send: upgradedSend,
            sendText: upgradedSendText,
            sendSystemMessage: upgradedSendSystemMessage,
            sendVoice: upgradedSendVoice,
            messageId: batchingMessageId,
        });
    };

    return {
        send,
        sendDevice,
        sendInitialSettings,
        sendLegacyDevice,
        sendSettings,
        sendText,
        sendSystemMessage,
        sendVoice,
        updateDefaults,
        batch,
    };
};

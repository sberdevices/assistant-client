import {
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
    Cancel,
    ICancel,
    IMessage,
} from '../../proto';
import { VpsVersion } from '../../typings';

export type BatchableMethods = {
    sendText: (
        data: string,
        params?: {
            messageId?: number;
            last?: 1 | -1;
            messageName?: string;
            vpsToken?: string;
            userId?: string;
            token?: string;
            userChannel?: string;
            version?: VpsVersion;
            meta?: { [k: string]: string };
        },
        type?: string,
        messageId?: number,
    ) => void;
    sendSystemMessage: (
        data: { data: Record<string, unknown>; messageName?: string },
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
    sendSettings: (data: ISettings, last?: boolean, messageId?: number) => void;
    messageId: number;
};

export const createClientMethods = ({
    getMessageId,
    sendMessage,
}: {
    getMessageId: () => number;
    sendMessage: (message: IMessage) => void;
}) => {
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
            | { cancel: Cancel }
        ) & {
            last: 1 | -1;
            messageName?: string;
            meta?: { [k: string]: string };
        };
        messageId: number;
    }) => {
        sendMessage({
            messageName: '',
            ...payload,
            messageId,
            ...other,
        });
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

    const sendCancel = (data: ICancel, last = true, messageId = getMessageId()) => {
        return send({
            payload: {
                cancel: Cancel.create(data),
                last: last ? 1 : -1,
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
    };

    const sendSystemMessage = (
        { data, messageName: mesName = '' }: { data: Record<string, unknown>; messageName?: string },
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

        const upgradedSendText: typeof sendText = (...[data, params, type]) => {
            checkLastMessageStatus(params?.last === 1);
            return sendText(data, params, type, batchingMessageId);
        };

        const upgradedSendSystemMessage: (
            data: { data: Record<string, unknown>; messageName?: string },
            last: boolean,
            params?: {
                meta?: { [k: string]: string };
            },
        ) => ReturnType<typeof sendSystemMessage> = (data, last, params) => {
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
        ) => ReturnType<typeof sendVoice> = (data, last, mesName, params) => {
            checkLastMessageStatus(last);
            return sendVoice(data, last, batchingMessageId, mesName, params);
        };

        const upgradedSendSettings: (
            data: ISettings,
            last?: boolean,
            messageId?: number,
        ) => ReturnType<typeof sendSettings> = (data, last, messageId) => {
            checkLastMessageStatus(last);
            return sendSettings(data, last, messageId);
        };

        return cb({
            sendText: upgradedSendText,
            sendSystemMessage: upgradedSendSystemMessage,
            sendVoice: upgradedSendVoice,
            sendSettings: upgradedSendSettings,
            messageId: batchingMessageId,
        });
    };

    return {
        sendDevice,
        sendInitialSettings,
        sendCancel,
        sendLegacyDevice,
        sendSettings,
        sendText,
        sendSystemMessage,
        sendVoice,
        batch,
    };
};

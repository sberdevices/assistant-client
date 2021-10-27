import { createNanoEvents } from '../../nanoevents';
import { IDevice, IInitialSettings, ILegacyDevice, IMessage, Message } from '../../proto';
import { VpsConfiguration, OriginalMessageType, VpsVersion } from '../../typings';

import { createClientMethods } from './methods';
import { createTransport } from './transport';

const safeJSONParse = <T>(str: string, defaultValue: T): T => {
    try {
        return JSON.parse(str) as T;
    } catch (err) {
        return defaultValue;
    }
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

export { BatchableMethods } from './methods';

export const appendHeader = (uint8Array: Uint8Array): Uint8Array => {
    // Добавляем 4 байта в начало с длинной сообщения
    const arrayBuffer = new ArrayBuffer(4);
    const dataView = new DataView(arrayBuffer, 0);
    dataView.setInt32(0, uint8Array.length, true);
    const newUint8Array = new Uint8Array(4 + uint8Array.length);
    newUint8Array.set(new Uint8Array(arrayBuffer));
    newUint8Array.set(uint8Array, 4);

    return newUint8Array;
};

export const removeHeader = (uint8Array: Uint8Array): Uint8Array => {
    // Убираем 4 байта в начале с длинной сообщения
    const newUint8Array = new Uint8Array(uint8Array).slice(4);

    return newUint8Array;
};

export interface ProtocolError {
    type: 'GET_TOKEN_ERROR';
    message?: string;
}

export interface ProtocolEvents {
    incoming: (message: OriginalMessageType) => void;
    outcoming: (message: OriginalMessageType) => void;
    ready: () => void;
    error: (error: ProtocolError) => void;
}

export const createProtocol = (
    transport: ReturnType<typeof createTransport>,
    { logger, getToken, ...params }: VpsConfiguration,
) => {
    const configuration = { ...params, token: '' };
    const {
        url,
        userId,
        userChannel,
        locale,
        device,
        settings,
        legacyDevice,
        version,
        messageName,
        vpsToken,
        meta,
    } = configuration;
    const basePayload = compileBasePayload({ userId, token: '', messageName, vpsToken, userChannel, version });

    const { on, emit } = createNanoEvents<ProtocolEvents>();
    const subscriptions: Array<() => void> = [];
    const messageQueue: Array<IMessage> = [];

    let initMessageId: number; // ид инициализационного сообщения, отправим мессаджи в неинициализированный протокол
    let currentSettings = { device, legacyDevice, settings, locale };
    let currentMessageId = Date.now();
    let status: 'connecting' | 'connected' | 'ready' | 'closed' = 'closed';
    let destroyed = false;
    let clearReadyTimer: number; // ид таймера установки состояния ready

    const getMessageId = () => {
        return currentMessageId++;
    };

    const send = (message: IMessage) => {
        const createdMessage = Message.create({ ...basePayload, ...message });

        logger?.({ type: 'outcoming', message: createdMessage });

        const encodedMessage = Message.encode(createdMessage).finish();
        const encodedMessageWithHeader = appendHeader(encodedMessage);

        transport.send(encodedMessageWithHeader);

        emit('outcoming', createdMessage);
    };

    const sendMessage = (message: IMessage) => {
        // отправляем инициализационные сообщения или все, когда сессия = ready
        if (status === 'ready' || (typeof initMessageId !== undefined && message.messageId === initMessageId)) {
            send(message);
        } else {
            // накапливаем сообщения, отправим после успешного коннекта
            messageQueue.push(message);
            if (status === 'closed' && !destroyed) {
                transport.open(url);
            }
        }
    };

    const {
        sendDevice: sendDeviceOriginal,
        sendInitialSettings: sendInitialSettingsOriginal,
        sendCancel,
        sendLegacyDevice: sendLegacyDeviceOriginal,
        sendSettings: sendSettingsOriginal,
        sendText,
        sendSystemMessage,
        sendVoice,
        batch,
    } = createClientMethods({ getMessageId, sendMessage });

    const sendDevice = ((data: IDevice, ...args: never[]) => {
        currentSettings = { ...currentSettings, device: data };

        return sendDeviceOriginal(data, ...args);
    }) as typeof sendDeviceOriginal;

    const sendInitialSettings = ((data: IInitialSettings, ...args: never[]) => {
        if (data.device && data.settings) {
            currentSettings = {
                ...currentSettings,
                device: data.device,
                settings: data.settings,
                locale: data.locale || undefined,
            };
        }

        return sendInitialSettingsOriginal(data, ...args);
    }) as typeof sendInitialSettingsOriginal;

    const sendLegacyDevice = ((data: ILegacyDevice, ...args: never[]) => {
        currentSettings = { ...currentSettings, legacyDevice: data };

        return sendLegacyDeviceOriginal(data, ...args);
    }) as typeof sendLegacyDeviceOriginal;

    const updateDefaults = (obj: Omit<Partial<typeof basePayload>, 'token'>) => {
        Object.assign(basePayload, obj);
        Object.assign(configuration, obj);
    };

    const updateDevice = (obj: Partial<VpsConfiguration['device']>) => {
        if (obj) {
            const { additionalInfo, ...deviceOptions } = obj;
            const oldInfo = currentSettings.device?.additionalInfo
                ? safeJSONParse(currentSettings.device?.additionalInfo, {})
                : {};
            const newInfo = additionalInfo ? safeJSONParse(additionalInfo, {}) : {};
            currentSettings.device = {
                ...currentSettings.device,
                ...deviceOptions,
                additionalInfo: JSON.stringify({
                    ...oldInfo,
                    ...newInfo,
                }),
            };
        }
    };

    const updateSettings = (obj: Partial<VpsConfiguration['settings']>) => {
        Object.assign(currentSettings.settings, obj);

        if (status === 'connected' || status === 'ready') {
            sendSettingsOriginal(obj);
        }
    };

    subscriptions.push(
        transport.on('connecting', () => {
            status = 'connecting';
        }),
    );
    subscriptions.push(
        transport.on('close', () => {
            status = 'closed';
        }),
    );
    subscriptions.push(
        transport.on('ready', async () => {
            try {
                Object.assign(basePayload, { token: await getToken() });
            } catch (e) {
                emit('error', {
                    type: 'GET_TOKEN_ERROR',
                    message: e?.message,
                });
                return;
            }

            Object.assign(configuration, { token: basePayload.token });
            initMessageId = getMessageId();
            if (version < 3) {
                if (version === 1 && currentSettings.legacyDevice) {
                    sendLegacyDevice(currentSettings.legacyDevice, false, initMessageId);
                } else if (version === 2 && currentSettings.device) {
                    sendDevice(currentSettings.device, false, initMessageId);
                }
                sendSettingsOriginal(currentSettings.settings, true, initMessageId);
            } else {
                sendInitialSettings(
                    {
                        userId,
                        userChannel,
                        device: currentSettings.device,
                        settings: currentSettings.settings,
                        locale: version > 3 ? currentSettings.locale : undefined,
                    },
                    true,
                    initMessageId,
                    { meta },
                );
            }

            status = 'connected';

            clearTimeout(clearReadyTimer);

            /// считаем коннект = ready, если по истечении таймаута сокет не был разорван
            /// т.к бек может разрывать сокет, если с settings что-то не так
            clearReadyTimer = window.setTimeout(() => {
                if (status !== 'connected') {
                    return;
                }

                status = 'ready';

                while (messageQueue.length > 0) {
                    const message = messageQueue.shift();
                    if (message) {
                        send(message);
                    }
                }

                emit('ready');
            }, 500);

            logger?.({ type: 'init', params: { ...configuration, ...currentSettings } });
        }),
    );
    subscriptions.push(
        transport.on('message', (message: Uint8Array) => {
            const decodedMessage = Message.decode(removeHeader(message));

            logger?.({ type: 'incoming', message: decodedMessage });

            emit('incoming', decodedMessage);
        }),
    );

    return {
        clearQueue: () => {
            messageQueue.splice(0, messageQueue.length);
        },
        destroy: () => {
            destroyed = true;
            transport.close();
            subscriptions.splice(0, subscriptions.length).map((unsubscribe) => unsubscribe());
        },
        on,
        getMessageId,
        sendCancel,
        sendText,
        sendSystemMessage,
        sendVoice,
        send: sendMessage,
        batch,
        changeConfiguration: updateDefaults,
        changeDevice: updateDevice,
        changeSettings: updateSettings,
        reconnect: () => {
            if (status !== 'closed') {
                transport.reconnect(url); // даем время случиться close
            } else {
                transport.open(url);
            }
        },
        get currentMessageId() {
            return currentMessageId;
        },
        get configuration() {
            return configuration;
        },
    };
};

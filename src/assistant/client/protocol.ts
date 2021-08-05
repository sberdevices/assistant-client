import { createNanoEvents } from '../../nanoevents';
import { IDevice, IInitialSettings, ILegacyDevice, IMessage, Message } from '../../proto';
import { VpsConfiguration, OriginalMessageType, VpsVersion } from '../../typings';

import { createClientMethods } from './methods';
import { createTransport } from './transport';

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
    let status: 'connecting' | 'ready' | 'closed' = 'closed';
    let destroyed = false;
    let clearReadyTimer: number; // ид таймера установки состояния ready

    const getMessageId = () => {
        return currentMessageId++;
    };

    const send = (message: IMessage) => {
        const newMessage = Message.create({ ...basePayload, ...message });

        logger?.logOutcoming(newMessage);

        transport.send(newMessage);

        emit('outcoming', newMessage);
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
        Object.assign(currentSettings.device, obj);
    };

    const updateSettings = (obj: Partial<VpsConfiguration['settings']>, sendNow = false) => {
        Object.assign(currentSettings.settings, obj);

        if (sendNow) {
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

            clearTimeout(clearReadyTimer);

            /// считаем коннект = ready, если по истечении таймаута сокет не был разорван
            /// т.к бек может разрывать сокет, если с settings что-то не так
            clearReadyTimer = window.setTimeout(() => {
                if (status !== 'connecting') {
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

            logger?.logInit({ ...configuration, ...currentSettings });
        }),
    );
    subscriptions.push(
        transport.on('message', (message: Message) => {
            logger?.logIncoming(message);
            emit('incoming', message);
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

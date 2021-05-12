import { Message, IDevice, ISettings, ILegacyDevice, IInitialSettings } from './proto';
import { EventsType, SystemMessageDataType, CreateClientDataType, ClientLogger, MessageNames } from './typings';
import { createNanoEvents } from './nanoevents';
import { createClientMethods } from './clientMethods';

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
        meta,
    } = clientParams;

    let status: 'connecting' | 'ready' | 'closed' = 'connecting';

    const messageQueue: Array<Uint8Array> = [];

    const { on, emit, once } = createNanoEvents<EventsType>();

    const pendingMessages: Map<number | Long, Array<Message>> = new Map();
    const commitedMessages: Map<number | Long, Array<Message>> = new Map();

    let currentSettings = { device, legacyDevice, settings, locale };
    let currentMessageId = Date.now();
    let retries = 0; // количество попыток коннекта при ошибке
    let destroyed = false;
    let ws: WebSocket;
    let timeOut: number | undefined;
    let clearRetryTimer: number; // ид таймера реконнекта при ошибке

    const getMessageId = () => {
        return currentMessageId++;
    };

    const waitForAnswerToUser = (messageId: number): Promise<SystemMessageDataType> => {
        return new Promise((resolve) => {
            const off = on('systemMessage', (systemMessageData, originalMessage) => {
                if (
                    originalMessage.messageId === messageId &&
                    originalMessage.messageName === MessageNames.ANSWER_TO_USER
                ) {
                    off();
                    resolve(systemMessageData);
                }
            });
        });
    };

    const sendMessage = (message: Message, buffer: Uint8Array) => {
        logger?.logOutcoming(message);

        emit('outcoming', message);

        if (status === 'ready') {
            ws.send(buffer);
        } else {
            messageQueue.push(buffer);
            if (status === 'closed' && !destroyed) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                startWebSocket();
            }
        }
    };

    const {
        send,
        sendDevice: sendDeviceOriginal,
        sendInitialSettings: sendInitialSettingsOriginal,
        sendLegacyDevice: sendLegacyDeviceOriginal,
        sendSettings: sendSettingsOriginal,
        sendText,
        sendSystemMessage,
        sendVoice,
        updateDefaults,
        batch,
    } = createClientMethods(
        { userId, token, messageName, vpsToken, userChannel, version },
        { getMessageId, sendMessage, waitForAnswerToUser },
    );

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

    const sendSettings = ((data: ISettings, ...args: never[]) => {
        currentSettings = { ...currentSettings, settings: data };

        return sendSettingsOriginal(data, ...args);
    }) as typeof sendSettingsOriginal;

    const setToken = (nextToken: CreateClientDataType['token']) => {
        updateDefaults({ token: nextToken });
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
            // сбрасываем количество попыток реконнекта по таймауту
            clearRetryTimer = window.setTimeout(() => {
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
                    sendInitialSettings(
                        {
                            userId,
                            userChannel,
                            device: currentSettings.device,
                            settings: currentSettings.settings,
                            locale: version > 3 ? currentSettings.locale : undefined,
                        },
                        true,
                        undefined,
                        { meta },
                    );
                }

                logger?.logInit({ ...clientParams, ...currentSettings });

                while (messageQueue.length > 0) {
                    const message = messageQueue.shift();
                    if (message) {
                        ws.send(message);
                    }
                }
            }

            emit('ready');
        });

        ws.addEventListener('close', () => {
            status = 'closed';
            emit('close');
        });

        ws.addEventListener('error', (e) => {
            if (status !== 'connecting') {
                throw e;
            }

            // пробуем переподключаться, если возникла ошибка при коннекте
            clearTimeout(clearRetryTimer);
            if (!ws || (ws.readyState === 3 && !destroyed)) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                timeOut = window.setTimeout(() => {
                    startWebSocket();
                    retries++;
                }, 300 * retries);
            }
        });

        ws.addEventListener('message', (e) => {
            const message = Message.decode(new Uint8Array(e.data).slice(4));

            const messages = pendingMessages.get(message.messageId) || [];

            logger?.logIncoming(message);

            messages.push(message);

            if (message.last === 1) {
                commitedMessages.set(message.messageId, messages);
                pendingMessages.delete(message.messageId);
            } else {
                pendingMessages.set(message.messageId, messages);
            }

            emit('message', message);

            if (message.status && message.status.code === -45) {
                emit('tokenExpired', message.status);
            }

            if (message.systemMessage?.data) {
                const systemMessage = JSON.parse(message.systemMessage.data);
                emit('systemMessage', systemMessage, message);
            }
        });
    };

    startWebSocket();

    return {
        once,
        send,
        sendDevice,
        sendLegacyDevice,
        sendSettings,
        sendText,
        sendVoice,
        waitForAnswerToUser,
        sendSystemMessage,
        on,
        updateDefaults,
        destroy,
        batch,
        setToken,
        get currentMessageId() {
            return currentMessageId;
        },
    };
};

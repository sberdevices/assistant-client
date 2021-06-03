import { Message, IDevice, ISettings, ILegacyDevice, IInitialSettings, IMessage } from './proto';
import {
    EventsType,
    SystemMessageDataType,
    CreateClientDataType,
    ClientLogger,
    MessageNames,
    VpsVersion,
} from './typings';
import { createNanoEvents } from './nanoevents';
import { createClientMethods } from './clientMethods';

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

export const createClient = (params: CreateClientDataType, logger?: ClientLogger) => {
    const clientParams = { ...params };
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
    const basePayload = compileBasePayload({ userId, token, messageName, vpsToken, userChannel, version });

    let status: 'connecting' | 'ready' | 'closed' = 'closed';

    const messageQueue: Array<IMessage> = [];

    const { on, emit, once } = createNanoEvents<EventsType>();

    const pendingMessages: Map<number | Long, Array<Message>> = new Map();
    const commitedMessages: Map<number | Long, Array<Message>> = new Map();

    let initMessageId: number;
    let currentSettings = { device, legacyDevice, settings, locale };
    let currentMessageId = Date.now();
    let retries = 0; // количество попыток коннекта при ошибке
    let destroyed = false;
    let ws: WebSocket;
    let timeOut: number | undefined;
    let clearReadyTimer: number; // ид таймера установки состояния ready

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

    const send = (message: IMessage) => {
        const newMessage = Message.create({ ...basePayload, ...message });

        const buffer = Message.encode(newMessage).finish();
        const bufferWithHeader = appendHeader(buffer);

        logger?.logOutcoming(newMessage);

        emit('outcoming', newMessage);

        ws.send(bufferWithHeader);
    };

    const sendMessage = (message: IMessage) => {
        // отправляем инициализационные сообщения или все, когда сессия = ready
        if (status === 'ready' || (typeof initMessageId !== undefined && message.messageId === initMessageId)) {
            send(message);
        } else {
            messageQueue.push(message);
            if (status === 'closed' && !destroyed) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                startWebSocket();
            }
        }
    };

    const {
        send: sendOriginal,
        sendDevice: sendDeviceOriginal,
        sendInitialSettings: sendInitialSettingsOriginal,
        sendCancel,
        sendLegacyDevice: sendLegacyDeviceOriginal,
        sendSettings: sendSettingsOriginal,
        sendText,
        sendSystemMessage,
        sendVoice,
        batch,
    } = createClientMethods({ getMessageId, sendMessage, waitForAnswerToUser });

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
        currentSettings = { ...currentSettings, settings: { ...currentSettings.settings, ...data } };

        return sendSettingsOriginal(data, ...args);
    }) as typeof sendSettingsOriginal;

    const updateDefaults = (obj: Partial<typeof basePayload>) => {
        ws.close();
        Object.assign(basePayload, obj);
        Object.assign(clientParams, obj);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setTimeout(startWebSocket); // даем время случиться close
    };

    const destroy = () => {
        destroyed = true;
        ws && ws.close();
        clearTimeout(timeOut);
        timeOut = undefined;
    };

    const startWebSocket = () => {
        if (status !== 'closed') {
            return;
        }

        status = 'connecting';
        setTimeout(() => {
            emit('connecting');
        }, 0);
        ws = new WebSocket(url);

        ws.binaryType = 'arraybuffer';
        ws.addEventListener('open', () => {
            if (ws.readyState === 1) {
                initMessageId = getMessageId();

                if (version < 3) {
                    if (version === 1 && currentSettings.legacyDevice) {
                        sendLegacyDevice(currentSettings.legacyDevice, false, initMessageId);
                    } else if (version === 2 && currentSettings.device) {
                        sendDevice(currentSettings.device, false, initMessageId);
                    }
                    sendSettings(currentSettings.settings, true, initMessageId);
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
                    retries = 0; // сбрасываем количество попыток реконнекта

                    while (messageQueue.length > 0) {
                        const message = messageQueue.shift();
                        if (message) {
                            send(message);
                        }
                    }

                    emit('ready');
                }, 500);

                logger?.logInit({ ...clientParams, ...currentSettings });
            }
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
            if (!ws || (ws.readyState === 3 && !destroyed)) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                if (retries < 3) {
                    timeOut = window.setTimeout(() => {
                        startWebSocket();
                        retries++;
                    }, 300 * retries);
                } else {
                    retries = 0;
                    emit('connectionError', e);
                }
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

            if (message.systemMessage?.data) {
                const systemMessage = JSON.parse(message.systemMessage.data);
                emit('systemMessage', systemMessage, message);
            }
        });
    };

    return {
        once,
        send: sendOriginal,
        sendDevice,
        sendLegacyDevice,
        sendSettings,
        sendCancel,
        sendText,
        sendVoice,
        waitForAnswerToUser,
        sendSystemMessage,
        on,
        updateDefaults,
        destroy,
        batch,
        start: startWebSocket,
        get currentMessageId() {
            return currentMessageId;
        },
    };
};

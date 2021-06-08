/* eslint-disable @typescript-eslint/camelcase */
import { createNanoEvents } from '../nanoevents';
import {
    AppInfo,
    AssistantAppState,
    AssistantSmartAppData,
    VpsConfiguration,
    EmotionId,
    OriginalMessageType,
    PermissionType,
    SystemMessageDataType,
} from '../typings';

import { createClient } from './client/client';
import { createProtocol } from './client/protocol';
import { createTransport } from './client/transport';
import { checkHadFirstSession, setHadFirstSession } from './firstSessionProvider';
import { getAnswerForRequestPermissions, getTime } from './meta';
import { createVoice } from './voice/voice';

export interface AssistantSettings {
    /** Отключение приветственного сообщения при старте */
    disableGreetings: boolean;
    /** Отключение фичи воспроизведения голоса */
    disableDubbing: boolean;
    /** Отключение фичи слушания речи */
    disableListening: boolean;
    /** Отправка текстовых сообщений с type: application/ssml */
    sendTextAsSsml: boolean;
}

export type AppEvent =
    | { type: 'run'; app: AppInfo }
    | { type: 'close'; app: AppInfo }
    | { type: 'command'; app: AppInfo; command: AssistantSmartAppData };

export type AssistantEvent = {
    asr?: { text: string; last?: boolean; mid?: OriginalMessageType['messageId'] }; // last и mid нужен для отправки исх бабла в чат
    emotion?: EmotionId;
};

export type VpsEvent =
    | { type: 'ready' }
    | { type: 'error'; error: Event }
    | { type: 'outcoming'; message: OriginalMessageType }
    | { type: 'incoming'; systemMessage: SystemMessageDataType; originalMessage: OriginalMessageType };

export type AssistantEvents = {
    app: (event: AppEvent) => void;
    assistant: (event: AssistantEvent) => void;
    vps: (event: VpsEvent) => void;
};

export const createAssistant = (configuration: VpsConfiguration) => {
    const { on, emit } = createNanoEvents<AssistantEvents>();

    const subscriptions: Array<() => void> = [];

    // хеш [messageId]: requestId, где requestId - пользовательский ид экшена
    const requestIdMap: Record<string, string> = {};

    // текущий апп
    let app: { info: AppInfo; getState?: () => Promise<AssistantAppState> } | null = null;
    let settings: AssistantSettings & {
        disabled: boolean;
    } = {
        disableGreetings: false,
        disableDubbing: configuration.settings.dubbing !== -1,
        disableListening: false,
        sendTextAsSsml: false,
        disabled: false, // вкл/выкл
    };

    const metaProvider = async (): Promise<Partial<Pick<SystemMessageDataType, 'app_info' | 'meta'>>> => {
        // стейт нужен только для канваса
        const appState =
            app !== null && app.info.frontendEndpoint && app.info.frontendEndpoint !== 'None' && app.getState
                ? await app.getState()
                : undefined;

        return {
            app_info: app?.info,
            meta: {
                time: getTime(),
                current_app:
                    app !== null && appState
                        ? {
                              app_info: app.info,
                              state: appState,
                          }
                        : undefined,
            },
        };
    };

    const transport = createTransport();
    const protocol = createProtocol(transport, configuration);
    const client = createClient(protocol, metaProvider);
    const voice = createVoice(client, (event) => emit('assistant', event));

    /** завершает текущий апп */
    const closeApp = () => {
        const current = app;

        app = null;

        if (current !== null) {
            emit('app', { type: 'close', app: current.info });
        }
    };

    /** отправляет текст */
    const sendText = (text: string) => {
        voice.stop();

        if (settings.disabled) {
            return;
        }

        client.sendText(text, settings.sendTextAsSsml);
    };

    /** отправляет server_action */
    const sendServerAction = (
        serverAction: unknown,
        messageName = 'SERVER_ACTION',
        requestId: string | undefined = undefined,
    ) => {
        voice.stop();

        if (settings.disabled) {
            return;
        }

        client.sendServerAction(serverAction, messageName).then((messageId) => {
            if (requestId && messageId) {
                requestIdMap[messageId.toString()] = requestId;
            }
        });
    };

    /** отправляет ответ на запрос доступа к местоположению и пр. меты */
    const sendMetaForPermissionRequest = async (
        requestMessageId: number | Long,
        appInfo: AppInfo,
        items: PermissionType[],
    ) => {
        client.sendData({
            data: await getAnswerForRequestPermissions(requestMessageId, appInfo, items),
            messageName: 'SERVER_ACTION',
        });
    };

    subscriptions.push(protocol.on('ready', () => emit('vps', { type: 'ready' })));

    // при неудачном переподключении к сокету
    subscriptions.push(
        transport.on('error', (error: Event) => {
            emit('vps', { type: 'error', error });
        }),
    );

    // обработка исходящих сообщений
    subscriptions.push(
        protocol.on('outcoming', (message: OriginalMessageType) => {
            emit('vps', { type: 'outcoming', message });
        }),
    );

    // обработка входящих команд, и событий аппа
    subscriptions.push(
        client.on('systemMessage', (systemMessage: SystemMessageDataType, originalMessage: OriginalMessageType) => {
            if (settings.disabled) {
                return;
            }

            if (originalMessage.messageName === 'ANSWER_TO_USER') {
                const { activate_app_info, items, app_info: mesAppInfo } = systemMessage;

                if (mesAppInfo && activate_app_info) {
                    emit('app', { type: 'run', app: mesAppInfo });
                }

                if (items) {
                    for (let i = 0; i < (items || []).length; i++) {
                        const { command } = items[i];

                        if (typeof command !== 'undefined') {
                            if (command.type === 'start_music_recognition') {
                                voice.shazam();
                                return;
                            }

                            if (command.type === 'request_permissions') {
                                sendMetaForPermissionRequest(
                                    originalMessage.messageId,
                                    mesAppInfo,
                                    command.permissions as PermissionType[],
                                );
                                return;
                            }

                            if ((command.type === 'smart_app_data' || command.type === 'navigation') && mesAppInfo) {
                                // эмитим все команды, т.к бывают фоновые команды
                                emit('app', {
                                    type: 'command',
                                    command: {
                                        ...(command as AssistantSmartAppData),
                                        sdk_meta: {
                                            mid: originalMessage.messageId.toString(),
                                            requestId: requestIdMap[originalMessage.messageId.toString()],
                                        },
                                    },
                                    app: mesAppInfo,
                                });
                            }

                            if (command.type === 'close_app') {
                                closeApp();
                            }
                        }
                    }
                }

                emit('vps', { type: 'incoming', systemMessage, originalMessage });
            }
        }),
    );

    /** уничтожает ассистент, очищает подписки */
    const destroy = () => {
        voice.destroy();
        client.destroy();
        protocol.destroy();

        subscriptions.splice(0, subscriptions.length).map((unsubscribe) => unsubscribe());
    };

    /** запускает ассистент (приветствие) */
    const start = async (initPhrase: string | undefined = undefined): Promise<SystemMessageDataType | undefined> => {
        if (settings.disabled) {
            return;
        }

        if (!settings.disableGreetings) {
            const isFirstSession = !checkHadFirstSession();
            await client.sendOpenAssistant().then(() => {
                if (isFirstSession) {
                    setHadFirstSession();
                }
            });
        }

        if (initPhrase) {
            return client
                .sendText(initPhrase)
                .then((messageId) => (messageId ? client.waitForAnswerToUser(messageId) : undefined));
        }

        return undefined;
    };

    return {
        enable: () => {
            settings.disabled = false;
            voice.change({ disableDubbing: settings.disableDubbing, disableListening: settings.disableListening });
        },
        disable: () => {
            settings.disabled = true;

            voice.change({ disableDubbing: true, disableListening: true });
        },
        get activeApp() {
            return app?.info || null;
        },
        destroy,
        closeApp,
        listen: voice.listen,
        sendServerAction,
        sendText,
        start,
        on,
        changeConfiguration: protocol.changeConfiguration,
        changeSettings: (newSettings: Partial<AssistantSettings>) => {
            settings = { ...settings, ...newSettings };

            if (!settings.disabled) {
                voice.change({ disableDubbing: settings.disableDubbing, disableListening: settings.disableListening });
            }
        },
        get protocol() {
            return protocol;
        },
        setActiveApp: (info: AppInfo, getState?: () => Promise<AssistantAppState>) => {
            app = { info, getState };
        },
    };
};

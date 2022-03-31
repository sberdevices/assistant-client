/* eslint-disable @typescript-eslint/camelcase */
import { ActionCommand } from '@salutejs/scenario';

import { createNanoEvents } from '../nanoevents';
import {
    AppInfo,
    AssistantAppState,
    AssistantSmartAppData,
    AssistantStartSmartSearch,
    VpsConfiguration,
    EmotionId,
    OriginalMessageType,
    PermissionType,
    SystemMessageDataType,
    CharacterId,
    AssistantBackgroundApp,
    AssistantCommand,
} from '../typings';

import { createClient } from './client/client';
import { createProtocol, ProtocolError } from './client/protocol';
import { createTransport } from './client/transport';
import { getAnswerForRequestPermissions, getTime } from './meta';
import { createVoice } from './voice/voice';

const STATE_UPDATE_TIMEOUT = 200;

const DEFAULT_PROJECT_ID = 'd929986a-611a-2ba0-6174-1928c99600a5';
const DEFAULT_APPLICATION_ID = '7c4e23bf-cd93-b57e-874b-d9fc1b35f93d';
const DEFAULT_APP_VERSION_ID = '26d0bb2e-45d6-a276-f70e-6c016d1f9cff';

const DEFAULT_APP: AppInfo = {
    projectId: DEFAULT_PROJECT_ID,
    applicationId: DEFAULT_APPLICATION_ID,
    appversionId: DEFAULT_APP_VERSION_ID,
    frontendStateId: [DEFAULT_PROJECT_ID, DEFAULT_APPLICATION_ID, DEFAULT_APP_VERSION_ID].join('_'),
    frontendType: 'DIALOG',
    systemName: 'assistant',
    frontendEndpoint: 'None',
};

const isDefaultApp = (appInfo: AppInfo) => appInfo.frontendStateId === DEFAULT_APP.frontendStateId;
const promiseTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    let timeoutId: number | undefined;
    return Promise.race([
        promise.then((v) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            return v;
        }),
        new Promise<never>((_, reject) => {
            timeoutId = window.setTimeout(() => {
                reject(new Error(`Timed out in ${timeout} ms.`));
            }, timeout);
        }),
    ]);
};

export interface AssistantSettings {
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
    | { type: 'command'; app: AppInfo; command: AssistantSmartAppData | AssistantStartSmartSearch };

export type AssistantEvent = {
    asr?: { text: string; last?: boolean; mid?: OriginalMessageType['messageId'] }; // last и mid нужен для отправки исх бабла в чат
    character?: CharacterId;
    emotion?: EmotionId;
};

export type VpsEvent =
    | { type: 'ready' }
    | { type: 'error'; error: Event | undefined }
    | { type: 'outcoming'; message: OriginalMessageType }
    | { type: 'incoming'; systemMessage: SystemMessageDataType; originalMessage: OriginalMessageType };

export type ActionCommandEvent = {
    type: 'command';
    command: ActionCommand;
};

export type AssistantError = ProtocolError;

export type AssistantEvents = {
    app: (event: AppEvent) => void;
    assistant: (event: AssistantEvent) => void;
    vps: (event: VpsEvent) => void;
    actionCommand: (event: ActionCommandEvent) => void;
    command: (command: AssistantCommand) => void;
    status: (status: OriginalMessageType['status']) => void;
    error: (error: AssistantError) => void;
};

export interface CreateAssistantDevOptions {
    getMeta?: () => Record<string, unknown>;
}

type BackgroundAppOnCommand<T> = (command: AssistantSmartAppData & { smart_app_data: T }, messageId: string) => void;

export const createAssistant = ({ getMeta, ...configuration }: VpsConfiguration & CreateAssistantDevOptions) => {
    const { on, emit } = createNanoEvents<AssistantEvents>();

    const subscriptions: Array<() => void> = [];

    // хеш [messageId]: requestId, где requestId - пользовательский ид экшена
    const requestIdMap: Record<string, string> = {};

    // готов/не готов воспроизводить озвучку
    let voiceReady = false;

    // текущий апп
    let app: { info: AppInfo; getState?: () => Promise<AssistantAppState> } = { info: DEFAULT_APP };
    let settings: AssistantSettings = {
        disableDubbing: configuration.settings.dubbing === -1,
        disableListening: false,
        sendTextAsSsml: false,
    };

    const backgroundApps: { [key: string]: AssistantBackgroundApp & { commandsSubscribers: unknown[] } } = {};

    const metaProvider = async (): Promise<Partial<Pick<SystemMessageDataType, 'app_info' | 'meta'>>> => {
        // Стейт нужен только для канваса
        const appState =
            app !== null && app.info.frontendType === 'WEB_APP' && app.getState
                ? await promiseTimeout<AssistantAppState>(app.getState(), STATE_UPDATE_TIMEOUT).catch(() => {
                      // eslint-disable-next-line no-console
                      console.error('App-state wasn`t resolved, timeout had been expired');
                      return undefined;
                  })
                : undefined;

        const current_app = {
            app_info: app.info,
            state: appState || {},
        };

        const getBackgroundAppsMeta = async () => {
            const apps = { ...backgroundApps };
            const backgroundAppsIds = Object.keys(apps);
            const backgroundAppsMeta: { app_info: AppInfo; state: Record<string, unknown> }[] = [];

            await Promise.all(
                backgroundAppsIds.map(async (applicationId) => {
                    const { getState = () => Promise.resolve({}) } = apps[applicationId];

                    return promiseTimeout(getState(), STATE_UPDATE_TIMEOUT).then(
                        (state) => state,
                        () => ({}),
                    );
                }),
            ).then((results) => {
                results.forEach((appResult, index) => {
                    const state = appResult;

                    const applicationId = backgroundAppsIds[index];

                    backgroundAppsMeta.push({
                        app_info: apps[applicationId].appInfo,
                        state,
                    });
                });
            });

            return backgroundAppsMeta;
        };

        const background_apps = await getBackgroundAppsMeta();

        return {
            meta: {
                time: getTime(),
                current_app,
                background_apps,
                ...(getMeta ? getMeta() : {}),
            },
        };
    };

    const transport = createTransport(configuration.fakeVps?.createFakeWS);
    const protocol = createProtocol(transport, {
        ...configuration,
        // выключаем озвучку, пока голос не готов
        settings: { ...configuration.settings, dubbing: !voiceReady ? -1 : configuration.settings.dubbing },
    });
    const client = createClient(protocol, metaProvider);
    const voice = createVoice(
        client,
        (event) => emit('assistant', event),
        () => {
            voiceReady = true;
            // когда голос готов, возвращаем первоначальное состояние
            protocol.changeSettings({ dubbing: settings.disableDubbing ? -1 : 1 });
        },
    );

    /** завершает текущий апп */
    const closeApp = () => {
        const current = app;

        app = {
            info: DEFAULT_APP,
        };

        if (!isDefaultApp(current.info)) {
            emit('app', { type: 'close', app: current.info });
        }
    };

    /** отправляет текст */
    const sendText = (text: string, shouldSendDisableDubbing = false) => {
        voice.stop();

        client.sendText(text, settings.sendTextAsSsml, shouldSendDisableDubbing);
    };

    /** отправляет server_action */
    const sendServerAction = (
        serverAction: unknown,
        messageName = 'SERVER_ACTION',
        requestId: string | undefined = undefined,
        actionApp: AppInfo = app.info,
    ) => {
        voice.stop();

        client.sendServerAction(serverAction, actionApp, messageName).then((messageId) => {
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
        const data = await getAnswerForRequestPermissions(requestMessageId, appInfo, items);
        client.sendData(data, 'SERVER_ACTION');
    };

    subscriptions.push(protocol.on('ready', () => emit('vps', { type: 'ready' })));

    // при неудачном переподключении к сокету
    subscriptions.push(
        transport.on('error', (error: Event | undefined) => {
            emit('vps', { type: 'error', error });
        }),
    );

    // обработка исходящих сообщений
    subscriptions.push(
        protocol.on('outcoming', (message: OriginalMessageType) => {
            emit('vps', { type: 'outcoming', message });
        }),
    );

    // обработка ошибок
    subscriptions.push(
        protocol.on('error', (error: ProtocolError) => {
            emit('error', error);
        }),
    );

    // оповещение о статусах
    subscriptions.push(
        client.on('status', (status) => {
            emit('status', status);
        }),
    );

    // обработка входящих команд, и событий аппа
    subscriptions.push(
        client.on('systemMessage', (systemMessage: SystemMessageDataType, originalMessage: OriginalMessageType) => {
            if (originalMessage.messageName === 'ANSWER_TO_USER') {
                const { activate_app_info, items, app_info: mesAppInfo, character } = systemMessage;

                if (character) {
                    emit('assistant', { character: character.id });
                }

                // по-умолчанию activate_app_info: true
                if (mesAppInfo && activate_app_info !== false) {
                    emit('app', { type: 'run', app: mesAppInfo });
                }

                if (items) {
                    for (let i = 0; i < (items || []).length; i++) {
                        const { command } = items[i];

                        if (typeof command !== 'undefined') {
                            setTimeout(() => emit('command', command));

                            if (command.type === 'start_music_recognition') {
                                voice.shazam();
                                return;
                            }

                            if (command.type === 'request_permissions' && mesAppInfo) {
                                sendMetaForPermissionRequest(
                                    originalMessage.messageId,
                                    mesAppInfo,
                                    command.permissions as PermissionType[],
                                );
                                return;
                            }

                            if (command.type === 'action') {
                                emit('actionCommand', {
                                    type: 'command',
                                    command: command as ActionCommand,
                                });
                                return;
                            }

                            if (
                                (command.type === 'smart_app_data' ||
                                    command.type === 'smart_app_error' ||
                                    command.type === 'start_smart_search' ||
                                    command.type === 'navigation') &&
                                mesAppInfo
                            ) {
                                // эмитим все команды, т.к бывают фоновые команды
                                emit('app', {
                                    type: 'command',
                                    command: {
                                        ...(command as AssistantSmartAppData | AssistantStartSmartSearch),
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

    // прокидывает команды backgroundApp'ов в их подписчики
    on('app', (event) => {
        if (event.type === 'command') {
            const backgroundAppOnCommand = backgroundApps[event.app.applicationId]?.commandsSubscribers;

            if (Array.isArray(backgroundAppOnCommand)) {
                backgroundAppOnCommand.forEach((onCommand) => {
                    onCommand(event.command, event.command.sdk_meta?.mid as string);
                });
            }
        }
    });

    /** уничтожает ассистент, очищает подписки */
    const destroy = () => {
        voice.destroy();
        client.destroy();
        protocol.destroy();

        subscriptions.splice(0, subscriptions.length).map((unsubscribe) => unsubscribe());
    };

    /** запускает ассистент (приветствие) */
    const start = async ({
        disableGreetings = false,
        initPhrase = undefined,
        isFirstSession = false,
    }: {
        /** Отключение приветственного сообщения при старте */
        disableGreetings?: boolean;
        initPhrase?: string;
        isFirstSession?: boolean;
    } = {}): Promise<SystemMessageDataType | undefined> => {
        if (!disableGreetings && isDefaultApp(app.info)) {
            await client.sendOpenAssistant({ isFirstSession });
        }

        if (initPhrase) {
            return client
                .sendText(initPhrase)
                .then((messageId) => (messageId ? client.waitForAnswer(messageId) : undefined));
        }

        return undefined;
    };

    return {
        get activeApp() {
            return !isDefaultApp(app.info) ? app.info : null;
        },
        get settings() {
            return settings;
        },
        destroy,
        closeApp,
        listen: voice.listen,
        sendServerAction,
        sendText,
        start,
        stop: () => {
            voice.stop();
            protocol.clearQueue();
            transport.close();
        },
        stopTts: voice.stopPlaying,
        stopVoice: voice.stop,
        emit,
        on,
        changeConfiguration: protocol.changeConfiguration,
        changeSettings: (newSettings: Partial<AssistantSettings>) => {
            const dubbingChanged = settings.disableDubbing !== !!newSettings.disableDubbing;
            settings = { ...settings, ...newSettings };

            voice.change({ disableDubbing: settings.disableDubbing, disableListening: settings.disableListening });

            if (!dubbingChanged) {
                return;
            }

            protocol.changeSettings({ dubbing: settings.disableDubbing || !voiceReady ? -1 : 1 });
        },
        reconnect: protocol.reconnect,
        get protocol() {
            return protocol;
        },
        setActiveApp: (info: AppInfo, getState?: () => Promise<AssistantAppState>) => {
            app = { info, getState };
        },
        addBackgroundApp: ({ appInfo, getState }: AssistantBackgroundApp) => {
            backgroundApps[appInfo.applicationId] = {
                appInfo,
                getState,
                commandsSubscribers: [],
            };

            const remove = () => {
                delete backgroundApps[appInfo.applicationId];
            };

            const onCommand = <T>(subscriber: BackgroundAppOnCommand<T>) => {
                backgroundApps[appInfo.applicationId]?.commandsSubscribers.push(subscriber);

                return {
                    clearSubscribers: () => {
                        if (backgroundApps[appInfo.applicationId]) {
                            backgroundApps[appInfo.applicationId].commandsSubscribers = [];
                        }
                    },
                };
            };

            const sendServerActionToBackgroundApp = (
                serverAction: unknown,
                messageName = 'SERVER_ACTION',
                requestId: string | undefined = undefined,
            ) => sendServerAction(serverAction, messageName, requestId, backgroundApps[appInfo.applicationId]?.appInfo);

            return {
                remove,
                onCommand,
                sendServerAction: sendServerActionToBackgroundApp,
            };
        },
    };
};

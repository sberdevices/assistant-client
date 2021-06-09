/* eslint-disable @typescript-eslint/camelcase */

import { v4 } from 'uuid';

import {
    AssistantAppState,
    AssistantServerAction,
    ClientLogger,
    AssistantSettings,
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    AssistantClientCommand,
    AssistantSmartAppError,
    AssistantSmartAppCommand,
    AssistantPostMessage,
} from './typings';
import { createNanoEvents } from './nanoevents';
import { initializeAssistantSDK } from './dev';
import { NativePanelParams } from './NativePanel/NativePanel';
import { createNanoObservable, ObserverFunc } from './nanoobservable';

export interface AssistantEvents<A extends AssistantSmartAppData> {
    start: () => void;
    data: (command: AssistantClientCustomizedCommand<A>) => void;
    command: <T extends AssistantSmartAppCommand['smart_app_data'] = AssistantSmartAppCommand['smart_app_data']>(
        data: T,
    ) => void;
    error: <T extends AssistantSmartAppError['smart_app_error'] = AssistantSmartAppError['smart_app_error']>(
        error: T,
    ) => void;
}

export interface SendDataParams {
    action: AssistantServerAction;
    name?: string;
    requestId?: string;
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

if (typeof window !== 'undefined' && inIframe()) {
    const postMessage = (action: AssistantPostMessage) => {
        window.top.postMessage(JSON.stringify(action), '*');
    };

    window.AssistantHost = {
        sendDataContainer(json: string) {
            postMessage({ type: 'sendDataContainer', payload: json });
        },
        close() {
            postMessage({ type: 'close' });
        },
        sendData(json: string) {
            postMessage({ type: 'sendData', payload: json });
        },
        setSuggest(suggests: string) {
            postMessage({ type: 'setSuggest', payload: suggests });
        },
        ready() {
            postMessage({ type: 'ready' });
        },
    };

    window.addEventListener('message', (e) => {
        try {
            if (typeof e.data === 'string') {
                const data = JSON.parse(e.data);

                switch (data.type) {
                    case 'onData':
                        window.AssistantClient?.onData?.(data.payload);
                        break;
                    case 'onRequestState': {
                        const state = window.AssistantClient?.onRequestState?.();
                        postMessage({ type: 'state', payload: state, requestId: data.requestId });
                        break;
                    }
                    case 'onRequestRecoveryState': {
                        const recoverystate = window.AssistantClient?.onRequestRecoveryState?.();
                        postMessage({ type: 'recoveryState', payload: recoverystate });
                        break;
                    }
                    case 'onStart':
                        window.AssistantClient?.onStart?.();
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.error(e, 'Unknown parsed message');
                        break;
                }
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err, 'Unknown message');
        }
    });
}

export const createAssistant = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => unknown;
}) => {
    let initialDataConsumed = false;
    let currentGetState = getState;
    let currentGetRecoveryState = getRecoveryState;
    const { on, emit } = createNanoEvents<AssistantEvents<A>>();
    const startedAppInitialData: AssistantClientCommand[] = [...(window.appInitialData || [])];
    const initialData: AssistantClientCommand[] = [...(window.appInitialData || [])];
    const observables = new Map<string, { next: ObserverFunc<A | AssistantSmartAppError>; requestId?: string }>();
    const emitCommand = (command: AssistantClientCustomizedCommand<A>) => {
        if (command.type === 'smart_app_data') {
            emit('command', command.smart_app_data as AssistantSmartAppCommand['smart_app_data']);
        }

        if (command.type === 'smart_app_error') {
            emit('error', command.smart_app_error);
        }

        return emit('data', command as A);
    };

    window.AssistantClient = {
        onData: (command: AssistantClientCommand) => {
            if (initialData.length) {
                let index = -1;
                if (command.type === 'character') {
                    index = initialData.findIndex(
                        (c) => c.type === 'character' && c.character.id === command.character.id,
                    );
                } else if (command.type === 'insets') {
                    index = initialData.findIndex((c) => c.type === 'insets');
                } else if (command.type === 'app_context') {
                    index = initialData.findIndex((c) => c.type === 'app_context');
                } else if (command.sdk_meta && command.sdk_meta?.mid && command.sdk_meta?.mid !== '-1') {
                    index = initialData.findIndex((c) => c.sdk_meta?.mid === command.sdk_meta?.mid);
                }

                if (index >= 0) {
                    initialData.splice(index, 1);
                    return;
                }
            }

            /// фильтр команды 'назад'
            /// может приходить type='system', но в типах это не отражаем
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            if (command.type === 'system' && command.system?.command?.toUpperCase() === 'BACK') {
                return;
            }

            if (
                (command.type === 'smart_app_data' || command.type === 'smart_app_error') &&
                command.sdk_meta?.requestId &&
                observables.has(command.sdk_meta.requestId)
            ) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { requestId: realReqId, ...meta } = command.sdk_meta;
                const { requestId, next } = observables.get(command.sdk_meta.requestId) || {};

                if (Object.keys(meta).length > 0 || requestId) {
                    command.sdk_meta = { ...meta };
                    if (requestId) {
                        command.sdk_meta = { requestId };
                    }
                }
                if (next) {
                    next(command.type === 'smart_app_data' ? ((command as unknown) as A) : command);
                }
                return;
            }

            emitCommand(command as AssistantClientCustomizedCommand<A>);
        },
        onRequestState: () => {
            return currentGetState();
        },
        onRequestRecoveryState: () => {
            if (currentGetRecoveryState) {
                return currentGetRecoveryState();
            }

            return undefined;
        },
        onStart: () => {
            emit('start');

            if (!initialDataConsumed && startedAppInitialData.length) {
                // делаем рассылку из initialSmartAppData, если она не была считана в getInitialData()
                startedAppInitialData.map((c) => emitCommand(c as AssistantClientCustomizedCommand<A>));
            }
        },
    };
    setTimeout(() => window.AssistantHost?.ready()); // таймаут для подписки на start

    const sendData = (
        { action, name, requestId }: SendDataParams,
        onData?: ObserverFunc<A | AssistantSmartAppError>,
    ): (() => void) => {
        if (window.AssistantHost?.sendDataContainer) {
            if (onData == null) {
                window.AssistantHost?.sendDataContainer(
                    /* eslint-disable-next-line @typescript-eslint/camelcase */
                    JSON.stringify({ data: action, message_name: name || '', requestId }),
                );
                return () => {};
            }

            if (requestId && observables.has(requestId)) {
                throw new Error('requestId должен быть уникальным');
            }

            const { subscribe } = createNanoObservable<A | AssistantSmartAppError>(({ next }) => {
                const realRequestId = requestId || v4();

                window.AssistantHost?.sendDataContainer(
                    /* eslint-disable-next-line @typescript-eslint/camelcase */
                    JSON.stringify({ data: action, message_name: name || '', requestId: realRequestId }),
                );

                observables.set(realRequestId, { next, requestId });
            });

            return subscribe({ next: onData }).unsubscribe;
        }

        if (onData != null) {
            throw new Error('Не поддерживается в данной версии клиента');
        }

        window.AssistantHost?.sendData(JSON.stringify(action), name || null);

        return () => {};
    };

    return {
        close: () => window.AssistantHost?.close(),
        getInitialData: () => {
            initialDataConsumed = true;
            return startedAppInitialData;
        },
        getRecoveryState: () => window.appRecoveryState,
        on,
        sendAction: <
            D extends AssistantSmartAppCommand['smart_app_data'] = AssistantSmartAppCommand['smart_app_data'],
            E extends AssistantSmartAppError['smart_app_error'] = AssistantSmartAppError['smart_app_error']
        >(
            action: {
                type: string;
                payload: Record<string, unknown>;
            },
            onData?: ObserverFunc<D>,
            onError?: ObserverFunc<E>,
            { name, requestId }: Pick<SendDataParams, 'name' | 'requestId'> = {},
        ) => {
            return sendData({ action, name, requestId }, (data: A | AssistantSmartAppError) => {
                if (data.type === 'smart_app_data' && onData) {
                    onData(data.smart_app_data as D);
                    return;
                }

                if (data.type === 'smart_app_error' && onError) {
                    onError(data.smart_app_error as E);
                    return;
                }

                emitCommand(data as AssistantClientCustomizedCommand<A>);
            });
        },
        sendData,
        setGetState: (nextGetState: () => {}) => {
            currentGetState = nextGetState;
        },
        setGetRecoveryState: (nextGetRecoveryState?: () => unknown) => {
            currentGetRecoveryState = nextGetRecoveryState;
        },
        setSuggest: (suggest: string) => window.AssistantHost?.setSuggest(suggest),
    };
};

export const createAssistantDev = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    initPhrase,
    nativePanel,
    url,
    userId,
    token,
    userChannel,
    surface,
    surfaceVersion,
    sdkVersion,
    enableRecord = false,
    recordParams,
    settings,
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, unknown> | undefined;
    url: string;
    userChannel: string; // канал (влияет на навыки)
    surface: string; // поверхность (влияет на навыки)
    initPhrase: string;
    nativePanel?: NativePanelParams | null;
    userId?: string;
    token?: string;
    surfaceVersion?: string; // версия хост-приложения (может влиять на навыки)
    sdkVersion?: string; // версия sdk (может влиять на навыки)
    enableRecord?: boolean; // показать управление записью лога сообщений
    recordParams?: {
        // параметры логирования сообщений
        defaultActive?: boolean;
        logger?: ClientLogger;
    };
    settings?: AssistantSettings;
}) => {
    initializeAssistantSDK({
        initPhrase,
        nativePanel,
        url,
        userId,
        token,
        userChannel,
        surface,
        surfaceVersion,
        sdkVersion,
        enableRecord,
        recordParams,
        settings,
    });

    return createAssistant<A>({ getState, getRecoveryState });
};

const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join(''),
    );

    return JSON.parse(jsonPayload);
};

// Публичный метод, использующий токен из SmartApp Studio
export const createSmartappDebugger = <A extends AssistantSmartAppData>({
    token,
    initPhrase,
    getState,
    getRecoveryState,
    settings = {},
    enableRecord,
    recordParams,
}: {
    token: string;
    initPhrase: string;
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, unknown> | undefined;
    settings?: Pick<AssistantSettings, 'dubbing'>;
    enableRecord?: boolean;
    recordParams?: {
        defaultActive?: boolean;
        logger?: ClientLogger;
    };
}) => {
    try {
        const { exp } = parseJwt(token);
        if (exp * 1000 <= Date.now()) {
            // eslint-disable-next-line no-alert
            alert('Срок действия токена истек!');
            throw new Error('Token expired');
        }
    } catch (exc) {
        if (exc.message !== 'Token expired') {
            // eslint-disable-next-line no-alert
            alert('Указан невалидный токен!');
            throw new Error('Wrong token');
        }
        throw exc;
    }

    return createAssistantDev<A>({
        initPhrase,
        token,
        settings: {
            ...settings,
            authConnector: 'developer_portal_jwt',
        },
        getState,
        getRecoveryState,
        url: 'wss://nlp2vps.online.sberbank.ru:443/vps/',
        surface: 'SBERBOX',
        userChannel: 'B2C',
        enableRecord,
        recordParams,
    });
};

export { createRecordOfflinePlayer as createRecordPlayer } from './record/offline-player';
export { createOnlineRecordPlayer } from './record/online-player';
export { NativePanelParams } from './NativePanel/NativePanel';
export * from './typings';
export * from './dev';
export {
    AssistantEvent,
    AppEvent,
    VpsEvent,
    ActionCommandEvent,
    createAssistant as createAssistantClient,
} from './assistant/assistant';
export { initializeDebugging } from './debug';
export {
    createAssistantHostMock,
    createAssistantHostMockWithRecord,
    AssistantActionResult,
    CommandParams,
} from './mock';

import { v4 } from 'uuid';

import {
    AssistantAppState,
    AssistantServerAction,
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    AssistantClientCommand,
    AssistantSmartAppError,
    AssistantSmartAppCommand,
    AssistantPostMessage,
    Hints,
    Suggestions,
} from './typings';
import { createNanoEvents } from './nanoevents';
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
        window.top?.postMessage(JSON.stringify(action), '*');
    };

    window.appInitialData = [];
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
        setSuggests(suggests: string) {
            postMessage({ type: 'setSuggests', payload: suggests });
        },
        setHints(hints: string) {
            postMessage({ type: 'setHints', payload: hints });
        },
        ready() {
            postMessage({ type: 'ready' });
        },
        sendText(message: string) {
            postMessage({ type: 'sendText', payload: message });
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

export interface CreateAssistantParams {
    getState: () => AssistantAppState;
    getRecoveryState?: () => unknown;
    ready?: boolean;
}

export const createAssistant = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    ready = true,
}: CreateAssistantParams) => {
    let currentGetState = getState;
    let currentGetRecoveryState = getRecoveryState;
    let isInitialDataReceived = false;
    let isInitialCommandsEmitted = false;
    /**
     * Стартовые команды на момент `window.AssistantClient.onStart()`.
     * Сохраняются однажды и не обновляются.
     * */
    let stackAppInitialData: AssistantClientCommand[] = [];
    /**
     * Стартовые команды, которые были получены методом `getInitialData()`.
     * Они не будут заэмичены при `window.AssistantClient.onStart()`.
     * */
    let receivedAppInitialData: AssistantClientCommand[] = [];
    const { on, emit } = createNanoEvents<AssistantEvents<A>>();
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

    const findSystemCommandIndex = (command: AssistantClientCommand) => {
        let index = -1;

        if (command.type === 'character') {
            index = stackAppInitialData.findIndex(
                (c) => c.type === 'character' && c.character.id === command.character.id,
            );
        } else if (command.type === 'insets') {
            index = stackAppInitialData.findIndex((c) => c.type === 'insets');
        } else if (command.type === 'app_context') {
            index = stackAppInitialData.findIndex((c) => c.type === 'app_context');
        } else if (command.sdk_meta && command.sdk_meta?.mid && command.sdk_meta?.mid !== '-1') {
            index = stackAppInitialData.findIndex((c) => c.sdk_meta?.mid === command.sdk_meta?.mid);
        }

        return index;
    };

    const saveAppInitialData = () => {
        stackAppInitialData = [...(window.appInitialData || [])];
    };

    const isCommandWasReceived = (command: AssistantClientCommand) => {
        for (const receivedCommand of receivedAppInitialData) {
            if (receivedCommand === command) {
                return true;
            }
        }
        return false;
    };

    const emitAppInitialData = () => {
        if (!isInitialCommandsEmitted) {
            const currentInitialData = stackAppInitialData;

            const notReceivedCommands =
                isInitialDataReceived === true
                    ? currentInitialData.filter((c) => !isCommandWasReceived(c))
                    : currentInitialData;

            notReceivedCommands.forEach((c) => emitCommand(c as AssistantClientCustomizedCommand<A>));
            isInitialCommandsEmitted = true;
        }
    };

    window.AssistantClient = {
        onData: (command: AssistantClientCommand) => {
            const commandIndex = findSystemCommandIndex(command);
            const isCommandExist = commandIndex >= 0;

            if (isCommandExist) {
                stackAppInitialData.splice(commandIndex, 1);
                return;
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
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    command.sdk_meta = { ...meta };
                    if (requestId) {
                        // eslint-disable-next-line @typescript-eslint/camelcase
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
            saveAppInitialData();
            emitAppInitialData();
        },
    };

    if (ready) {
        setTimeout(() => window.AssistantHost?.ready()); // таймаут для подписки на start
    }

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
            isInitialDataReceived = true;
            receivedAppInitialData = [...(window.appInitialData || [])];
            return receivedAppInitialData;
        },
        findInInitialData: <T>({ type, command }: { type?: string; command?: string }): T | undefined => {
            const appInitialData = [...(window.appInitialData || [])];
            const result = appInitialData.find((data) => {
                if (!command && type && type === data.type) {
                    return true;
                }
                const isCommandInSmartAppData = command && 'smart_app_data' in data;
                if (!isCommandInSmartAppData) {
                    return;
                }
                if (
                    command === (data.smart_app_data as any).command ||
                    command === (data.smart_app_data as AssistantSmartAppCommand['smart_app_data']).type
                ) {
                    return true;
                }
                return false;
            }) as AssistantClientCustomizedCommand<AssistantSmartAppCommand>;
            return ((result && 'smart_app_data' in result ? result.smart_app_data : result) as unknown) as T;
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
        setSuggests: (suggestions: Suggestions['buttons']) => {
            window.AssistantHost?.setSuggests(JSON.stringify({ suggestions: { buttons: suggestions } }));
        },
        setHints: (hints: Hints) => {
            window.AssistantHost?.setHints(JSON.stringify({ hints }));
        },
        sendText: (message: string) => window.AssistantHost?.sendText(message),
        ready: () => window.AssistantHost?.ready(),
    };
};

// eslint-disable-next-line no-underscore-dangle
window.__ASSISTANT_CLIENT__ = { version: 'process.env.APP_VERSION' };

export * from './typings';

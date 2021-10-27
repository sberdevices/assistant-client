import { createRecordOfflinePlayer } from './record/offline-player';
import {
    AssistantRecord,
    AssistantAppState,
    AssistantServerAction,
    AssistantClientCommand,
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
} from './typings';

export interface AssistantActionResult {
    action: AssistantServerAction;
    name?: string | null;
    requestId?: string;
    state: AssistantAppState;
}

export interface CommandParams {
    onRequest?: () => void;
    waitRequest?: boolean;
}

// сначала создаем mock, затем вызываем createAssistant
export const createAssistantHostMock = ({ context = window }: { context?: Window } = {}) => {
    /* eslint-disable-next-line no-spaced-func, func-call-spacing, @typescript-eslint/no-explicit-any */
    const handlers = new Map<string, (action: any) => void>();

    let currentResolve: ((value: AssistantActionResult) => void) | null = null;
    let onReady: () => void;

    const handleAction = (action: AssistantServerAction, name: string | null, requestId?: string) => {
        if (!context.AssistantClient || !context.AssistantClient.onRequestState || !context.AssistantClient.onData) {
            throw new Error('Assistant not initialized');
        }

        if (currentResolve) {
            const resolve = currentResolve;
            currentResolve = null;
            resolve({
                state: context.AssistantClient.onRequestState(),
                name,
                action,
                requestId,
            });
            return;
        }

        if ('action_id' in action) {
            const actionType = action.action_id.toLowerCase();
            const handler = handlers.has(actionType) ? handlers.get(actionType) : undefined;
            if (handler != null) {
                handler(action);
            }
        }
    };

    context.AssistantHost = {
        close: () => {
            // ничего не делаем
        },
        ready: () => {
            window.AssistantClient?.onStart && window.AssistantClient?.onStart();
            onReady && onReady();
        },
        sendData: (action: string, message: string | null) => {
            handleAction(JSON.parse(action), message);
        },
        sendDataContainer: (container: string) => {
            const { data: action, message_name: name, requestId } = JSON.parse(container);

            handleAction(action, name, requestId);
        },
        setSuggests: () => {
            throw new Error('Not implemented method');
        },
        setHints: () => {
            throw new Error('Not implemented method');
        },
        sendText: () => {
            throw new Error('Not implemented method');
        },
    };

    /** Добавить обработчик клиентского экшена */
    const addActionHandler = <T extends AssistantServerAction>(actionType: string, handler: (action: T) => void) => {
        const type = actionType.toLowerCase();
        if (handlers.has(type)) {
            throw new Error('Action-handler already exists');
        }

        handlers.set(type, handler);
    };

    /** Удалить обработчик клиентского экшена */
    const removeActionHandler = (actionType: string) => {
        const type = actionType.toLowerCase();
        if (handlers.has(type)) {
            handlers.delete(type);
        }
    };

    /** Вызвать обработчик команды бека */
    const receiveCommand = <T extends AssistantSmartAppData>(command: AssistantClientCustomizedCommand<T>) => {
        if (!context.AssistantClient || !context.AssistantClient.onData) {
            throw new Error('Assistant not initialized');
        }

        context.AssistantClient.onData(command as AssistantClientCommand);
        return new Promise((resolve) => setTimeout(resolve));
    };

    /** Дождаться и вернуть клиентский экшен и его контекст */
    const waitAction = (onAction?: () => void) => {
        return new Promise<AssistantActionResult>((resolve) => {
            currentResolve = resolve;
            onAction && onAction();
        });
    };

    return {
        addActionHandler,
        removeActionHandler,
        receiveCommand,
        waitAction,
        onReady: (cb: () => void) => {
            onReady = cb;
        },
    };
};

export const createAssistantHostMockWithRecord = ({
    context = window,
    record,
}: {
    context?: Window & typeof globalThis;
    record: AssistantRecord;
}) => {
    const mock = createAssistantHostMock({ context });
    const player = createRecordOfflinePlayer(record, { context });
    let hasNext = true;

    const next = ({ onRequest, waitRequest = false }: CommandParams = {}) => {
        return new Promise((resolve) => {
            hasNext = player.continue((command: AssistantClientCommand) => {
                if (!waitRequest && onRequest == null) {
                    resolve(mock.receiveCommand(command));
                    return;
                }

                return mock.waitAction(onRequest).then((result) => {
                    // на будущее - неплохо было бы иметь эталон из записи
                    mock.receiveCommand(command);
                    resolve(result);
                });
            });
        });
    };

    return {
        get hasNext() {
            return hasNext;
        },
        onReady: mock.onReady,
        next,
        receiveCommand: mock.receiveCommand,
    };
};

import { AssistantAction, AssistantAppState, AssistantCharacterCommand, AssistantNavigationCommand, AssistantServerAction, AssistantSmartAppCommand, ClientLogger } from './typings';
import { createNanoEvents } from './nanoevents';
import { initializeAssistantSDK } from './dev';
import { NativePanelParams } from './NativePanel/NativePanel';

export interface AssistantEvents {
    start: () => void;
    data: (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => void;
}

export const createAssistant = ({ getState }: { getState: () => AssistantAppState }) => {
    let state: {} | null = null;
    let currentGetState = getState;
    const { on, emit } = createNanoEvents<AssistantEvents>();

    window.AssistantClient = {
        onData: (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => emit('data', command),
        onRequestState: () => {
            state = currentGetState();
            window.AssistantHost?.updateState(JSON.stringify(state));
        },
        onStart: () => emit('start'),
    };
    setTimeout(() => window.AssistantHost?.ready()); // таймаут для подписки на start

    return {
        close: () => window.AssistantHost?.close(),
        getInitialData: () => window.appInitialData, // messages от бека для инициализации аппа
        getRecoveryState: () => ({ ...state }),
        on,
        sendData: (action: AssistantAction | AssistantServerAction, name?: string) =>
            window.AssistantHost?.sendData(JSON.stringify(action), name || null),
        setGetState: (nextGetState: () => {}) => {
            currentGetState = nextGetState;
        },
        setSuggest: (suggest: string) => window.AssistantHost?.setSuggest(suggest),
    };
};

export const createAssistantDev = ({
    getState,
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
}: {
    getState: () => AssistantAppState;
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
    });

    return createAssistant({ getState });
};

export { createRecordOfflinePlayer as createRecordPlayer } from './record/offline-player';
export { NativePanelParams } from './NativePanel/NativePanel';
export * from './typings';
export * from './dev';
export { createClient } from './client';
export { createAudioRecorder } from './createAudioRecorder';
export { initializeDebugging } from './debug';

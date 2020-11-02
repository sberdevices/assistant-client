import {
    AssistantAppState,
    AssistantCharacterCommand,
    AssistantNavigationCommand,
    AssistantServerAction,
    AssistantSmartAppCommand,
    ClientLogger,
} from './typings';
import { createNanoEvents } from './nanoevents';
import { initializeAssistantSDK, settings } from './dev';
import { NativePanelParams } from './NativePanel/NativePanel';
import { ISettings } from './proto';
import { VoicePlayerSettings } from './createVoicePlayer';

export interface AssistantEvents {
    start: () => void;
    data: (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => void;
}

export const createAssistant = ({
    getState,
    getRecoveryState,
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => any;
}) => {
    let currentGetState = getState;
    let currentGetRecoveryState = getRecoveryState;
    const { on, emit } = createNanoEvents<AssistantEvents>();

    window.AssistantClient = {
        onData: (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) =>
            emit('data', command),
        onRequestState: () => {
            return currentGetState();
        },
        onRequestRecoveryState: () => {
            if (currentGetRecoveryState) {
                return currentGetRecoveryState();
            }

            return undefined;
        },
        onStart: () => emit('start'),
    };
    setTimeout(() => window.AssistantHost?.ready()); // таймаут для подписки на start

    return {
        close: () => window.AssistantHost?.close(),
        getInitialData: () => window.appInitialData, // messages от бека для инициализации аппа
        getRecoveryState: () => window.appRecoveryState,
        on,
        sendData: ({
            action,
            name,
            requestId,
        }: {
            action: AssistantServerAction;
            name?: string;
            requestId?: string;
        }) => {
            if (window.AssistantHost?.sendDataContainer) {
                /* eslint-disable-next-line @typescript-eslint/camelcase */
                window.AssistantHost?.sendDataContainer(
                    JSON.stringify({ data: action, message_name: name || null, requestId }),
                );
            } else {
                window.AssistantHost?.sendData(JSON.stringify(action), name || null);
            }
        },
        setGetState: (nextGetState: () => {}) => {
            currentGetState = nextGetState;
        },
        setGetRecoveryState: (nextGetRecoveryState?: () => any) => {
            currentGetRecoveryState = nextGetRecoveryState;
        },
        setSuggest: (suggest: string) => window.AssistantHost?.setSuggest(suggest),
    };
};

export const createAssistantDev = ({
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
    voiceSettings,
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, any> | undefined;
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
    settings?: ISettings;
    voiceSettings?: VoicePlayerSettings; // настройки озвучки
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
        voiceSettings: voiceSettings || { startVoiceDelay: 1 },
    });

    return createAssistant({ getState, getRecoveryState });
};

// Публичный метод, использующий токен из SmartApp Studio
export const createSmartappDebugger = ({
    token,
    initPhrase,
    getState,
    getRecoveryState,
}: {
    token: string;
    initPhrase: string;
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, any> | undefined;
}) => {
    return createAssistantDev({
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
    });
};

export { createRecordOfflinePlayer as createRecordPlayer } from './record/offline-player';
export { NativePanelParams } from './NativePanel/NativePanel';
export * from './typings';
export * from './dev';
export { createClient } from './client';
export { createAudioRecorder } from './createAudioRecorder';
export { initializeDebugging } from './debug';

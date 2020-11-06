import {
    AssistantAppState,
    AssistantCharacterCommand,
    AssistantNavigationCommand,
    AssistantServerAction,
    AssistantSmartAppCommand,
    ClientLogger,
    Settings,
    VoicePlayerSettings,
} from './typings';
import { createNanoEvents } from './nanoevents';
import { initializeAssistantSDK, settings } from './dev';
import { NativePanelParams } from './NativePanel/NativePanel';

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
    settings?: Settings;
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
    try {
        const { exp } = parseJwt(token);
        if (exp * 1000 <= Date.now()) {
            alert('Срок действия токена истек!');
            throw new Error('Token expired');
        }
    } catch (exc) {
        if (exc.message !== 'Token expired') {
            alert('Указан невалидный токен!');
            throw new Error('Wrong token');
        }
        throw exc;
    }

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

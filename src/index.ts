import {
    AssistantAppState,
    AssistantServerAction,
    ClientLogger,
    VoicePlayerSettings,
    AssistantSettings,
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    AssistantClientCommand,
} from './typings';
import { createNanoEvents } from './nanoevents';
import { initializeAssistantSDK } from './dev';
import { NativePanelParams } from './NativePanel/NativePanel';
import { createSpeechRecognizer } from './createSpeechRecognizer';

export interface AssistantEvents<A extends AssistantSmartAppData> {
    start: () => void;
    data: (command: AssistantClientCustomizedCommand<A>) => void;
}

export const createAssistant = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => any;
}) => {
    let currentGetState = getState;
    let currentGetRecoveryState = getRecoveryState;
    const { on, emit } = createNanoEvents<AssistantEvents<A>>();
    const initialData: AssistantClientCommand[] = [...window.appInitialData];

    window.AssistantClient = {
        onData: (command: any) => {
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
                } else if (command.sdkMeta && command.sdkMeta?.mid !== '-1') {
                    index = initialData.findIndex((c) => c.sdkMeta?.mid === command.sdkMeta.mid);
                }

                if (index >= 0) {
                    initialData.splice(index, 1);
                    return;
                }
            }

            return emit('data', command as A);
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
                window.AssistantHost?.sendDataContainer(
                    /* eslint-disable-next-line @typescript-eslint/camelcase */
                    JSON.stringify({ data: action, message_name: name || '', requestId }),
                );
            } else {
                window.AssistantHost?.sendData(JSON.stringify(action), name || null);
            }
        },
        sendDataAsync: async () => {},
        setGetState: (nextGetState: () => {}) => {
            currentGetState = nextGetState;
        },
        setGetRecoveryState: (nextGetRecoveryState?: () => any) => {
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
    settings?: AssistantSettings;
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
    getRecoveryState?: () => Record<string, any> | undefined;
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
export { createClient } from './client';
export { createMusicRecognizer } from './createMusicRecognizer';
export { createSpeechRecognizer } from './createSpeechRecognizer';
export { createVoiceListener } from './createVoiceListener';
export { createVoicePlayer } from './createVoicePlayer';
export { initializeDebugging } from './debug';
export {
    createAssistantHostMock,
    createAssistantHostMockWithRecord,
    AssistantActionResult,
    CommandParams,
} from './mock';

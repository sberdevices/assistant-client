/* eslint-disable @typescript-eslint/camelcase */

import { AssistantAppState, AssistantSettings, AssistantSmartAppData } from './typings';
import { initializeAssistantSDK, InitializeAssistantSDKParams } from './dev';
import { createAssistant } from './createAssistant';

export const createAssistantDev = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    ...sdkParams
}: {
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, unknown> | undefined;
} & Pick<
    InitializeAssistantSDKParams,
    | 'initPhrase'
    | 'url'
    | 'userChannel'
    | 'surface'
    | 'userId'
    | 'token'
    | 'surfaceVersion'
    | 'nativePanel'
    | 'sdkVersion'
    | 'enableRecord'
    | 'recordParams'
    | 'fakeVps'
    | 'settings'
    | 'getMeta'
    | 'features'
>) => {
    initializeAssistantSDK({
        ...sdkParams,
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
    getState,
    getRecoveryState,
    settings = {},
    ...sdkParams
}: {
    token: string;
    getState: () => AssistantAppState;
    getRecoveryState?: () => Record<string, unknown> | undefined;
    settings?: Pick<AssistantSettings, 'dubbing'>;
} & Pick<InitializeAssistantSDKParams, 'initPhrase' | 'enableRecord' | 'recordParams' | 'getMeta'>) => {
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
        ...sdkParams,
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
export { createOnlineRecordPlayer } from './record/online-player';
export { NativePanelParams } from './NativePanel/NativePanel';
// export * from './typings';
export * from './dev';
export { initializeDebugging } from './debug';
export * from './record/mock-recorder';
export * from './record/createMockWsCreator';
export {
    createAssistantHostMock,
    createAssistantHostMockWithRecord,
    AssistantActionResult,
    CommandParams,
} from './mock';

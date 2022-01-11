/* eslint-disable @typescript-eslint/camelcase */

import { AssistantSettings, AssistantSmartAppData } from './typings';
import { initializeAssistantSDK, InitializeAssistantSDKParams } from './dev';
import { createAssistant, CreateAssistantParams } from './createAssistant';

export type Surface = 'SBERBOX' | 'STARGATE' | 'SATELLITE' | 'COMPANION' | 'SBOL' | 'TV' | 'TV_HUAWEI' | 'TIME';
export type Channel = 'B2C' | 'COMPANION_B2C' | 'SBOL';

const channelForSurface: Record<string, Channel> = {
    COMPANION: 'COMPANION_B2C',
    SBOL: 'SBOL',
};

export type CreateAssistantDevParams = CreateAssistantParams & {
    surface?: Surface | string;
    userChannel?: Channel | string;
} & Pick<
        InitializeAssistantSDKParams,
        | 'initPhrase'
        | 'url'
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
    >;

export const createAssistantDev = <A extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    ready,
    surface = 'SBERBOX',
    userChannel,
    ...sdkParams
}: CreateAssistantDevParams) => {
    const { nativePanel } = initializeAssistantSDK({
        ...sdkParams,
        surface,
        userChannel: userChannel || channelForSurface[surface] || 'B2C',
    });

    return {
        ...createAssistant<A>({ getState, getRecoveryState, ready }),
        nativePanel,
    };
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
    ready,
    settings = {},
    nativePanel,
    ...sdkParams
}: {
    token: string;
    settings?: Pick<AssistantSettings, 'dubbing'>;
} & CreateAssistantParams &
    Pick<
        CreateAssistantDevParams,
        'surface' | 'userChannel' | 'nativePanel' | 'initPhrase' | 'enableRecord' | 'recordParams' | 'getMeta'
    >) => {
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
        nativePanel,
        getState,
        getRecoveryState,
        ready,
        url: 'wss://nlp2vps.online.sberbank.ru:443/vps/',
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

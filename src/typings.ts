import {
    Action,
    ActionCommand,
    BubbleCommand,
    CardCommand,
    Suggestions,
    AppInfo,
    Character as SaluteCharacter,
    UUID,
    Meta,
} from '@salutejs/types';

import { IDevice, ILegacyDevice, IMessage, ISettings, Message } from './proto';

export { Message } from './proto';

export {
    Suggestions,
    TextAction,
    DeepLinkAction,
    Action,
    ActionCommand,
    AppInfo,
    UUID,
    Bubble,
    Card,
    Meta,
    PermissionType,
    PermissionStatus,
} from '@salutejs/types';

export type ThemeColorName = 'dark' | 'light';

export type Theme = {
    name: ThemeColorName;
};

export type CharacterId = 'sber' | 'eva' | 'joy';

export type Character = SaluteCharacter & {
    id: CharacterId;
};

export enum VpsVersion {
    '1.0' = 1,
    '2.0' = 2,
    '3.0' = 3,
    '4.0' = 4,
    '5.0' = 5,
}

export const MessageNames = {
    ANSWER_TO_USER: 'ANSWER_TO_USER',
    STT: 'STT',
    MUSIC_RECOGNITION: 'MUSIC_RECOGNITION',
    DO_NOTHING: 'DO_NOTHING',
};

export interface DPMessage extends IMessage {
    sessionId: string;
    uuid: UUID;
}

export interface AssistantAppStateBase<T> {
    /* Любые данные, которые могут потребоваться Backend'у для принятия решений */
    [key: string]: unknown;
    item_selector?: {
        ignored_words?: string[];
        /* Список соответствий голосовых команд действиям в веб-приложении */
        items: AssistantViewItemBase<T>[];
    };
}

export type AssistantAppState = AssistantAppStateBase<Action>;

export interface AssistantViewItemBase<T> {
    /* Порядковый номер элемента, назначается смартаппом, уникален в рамках items */
    number?: number;
    /* Уникальный id элемента */
    id?: string;
    /* Ключевая фраза, которая должна приводить к данному действию */
    title?: string;
    /* Фразы-синонимы, которые должны быть расценены как данное действие */
    aliases?: string[];
    /* Сервер экшен, проксирует action обратно на бекэнд. */
    server_action?: AssistantServerAction;
    /* Экшен, который вернется в AssistantSmartAppData */
    action?: T;
    /* Дополнительные данные для бэкенда */
    [key: string]: unknown;
}

export type AssistantViewItem = AssistantViewItemBase<Action>;

export interface AssistantServerActionAppInfo {
    projectId: string;
    applicationId?: string;
    appversionId?: string;
}

export type AssistantServerAction =
    | { action_id: string; parameters?: Record<string, unknown> }
    | { type: string; payload?: Record<string, unknown> };

export type AssistantCommands =
    | ActionCommand
    | AssistantThemeCommand
    | AssistantCharacterCommand
    | AssistantCloseAppCommand
    | AssistantNavigationCommand
    | AssistantSmartAppCommand
    | AssistantVisibilityCommand
    | AssistantPlayerCommand
    | AssistantSystemCommand;

export interface SdkMeta {
    mid?: string;
    requestId?: string;
}

export interface AssistantThemeCommand {
    type: 'theme';
    theme: Theme;
    sdk_meta?: SdkMeta;
}

export interface AssistantCharacterCommand {
    type: 'character';
    character: Character;
    sdk_meta: SdkMeta;
}

export interface Insets {
    left: number; // px
    top: number; // px
    right: number; // px
    bottom: number; // px
}

export interface AssistantInsetsCommand {
    type: 'insets';
    insets: Insets;
    sdk_meta: SdkMeta;
}

export interface AssistantCloseAppCommand {
    type: 'close_app';
}

export interface AssistantNavigationCommand {
    type: 'navigation';
    navigation: { command: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'FORWARD' };
    sdk_meta?: SdkMeta;
}

export interface AssistantActionCommand {
    type: 'action';
    action: {
        type: string;
        [key: string]: unknown;
    };
}

export interface AssistantSmartAppData {
    type: 'smart_app_data';
    smart_app_data: Record<string, unknown>;
    sdk_meta?: SdkMeta;
}

export interface AssistantSmartAppError {
    type: 'smart_app_error';
    smart_app_error: {
        code: number;
        description: string;
    };
    sdk_meta?: SdkMeta;
}

export interface AssistantSmartAppCommand extends AssistantSmartAppData {
    smart_app_data: {
        type: string;
        payload?: Record<string, unknown>;
    };
    sdk_meta?: SdkMeta;
}

export interface AppContext {
    app_info: AppInfo;
    device_id: string;
    platform: string;
    sdk_version: string;
}

export interface AssistantAppContext {
    type: 'app_context';
    app_context: AppContext;
    sdk_meta?: SdkMeta;
}

export interface AssistantPlayerCommand {
    type: 'player_command';
    player_command: { [key: string]: unknown };
}

export interface AssistantVisibilityCommand {
    type: 'visibility';
    visibility: 'visible' | 'hidden';
    sdk_meta?: SdkMeta;
}

export interface AssistantSystemCommand {
    type: 'system';
    system: { command: string; [key: string]: unknown };
}

export type AssistantClientCustomizedCommand<T extends AssistantSmartAppData> =
    | AssistantAppContext
    | AssistantThemeCommand
    | AssistantCharacterCommand
    | AssistantNavigationCommand
    | AssistantVisibilityCommand
    | AssistantInsetsCommand
    | AssistantSmartAppError
    | T;

export type AssistantClientCommand = AssistantClientCustomizedCommand<AssistantSmartAppCommand>;

export interface AssistantClient {
    onStart?: () => void;
    onRequestState?: () => Record<string, unknown>;
    onRequestRecoveryState?: () => unknown;
    onData?: (command: AssistantClientCommand) => void;
}

export interface AssistantHost {
    close: () => void;
    ready: () => void;
    sendData: (action: string, message: string | null) => void;
    sendDataContainer: (container: string) => void;
    sendText: (message: string) => void;
    setSuggests: (suggest: string) => void;
    setHints: (hints: string) => void;
}

export interface AssistantWindow {
    AssistantHost?: AssistantHost;
    AssistantClient?: AssistantClient;
    appInitialData: Array<AssistantClientCommand>;
    appRecoveryState: unknown;

    __dangerouslySendDataMessage?: (data: {}, name: string) => void;
    __dangerouslySendVoiceMessage?: (message: string) => void;
    __dangerouslyGetAssistantAppState?: () => AssistantAppState;
    __dangerouslySendTextMessage?: (text: string) => void;
}

export interface Device {
    platformType?: string | null;
    platformVersion?: string | null;
    surface?: string | null;
    surfaceVersion?: string | null;
    features?: string | null;
    capabilities?: string | null;
    deviceId?: string | null;
    deviceManufacturer?: string | null;
    deviceModel?: string | null;
    additionalInfo?: string | null;
    tenant?: string | null;
}

export interface LegacyDevice {
    clientType?: string | null;
    channel?: string | null;
    channelVersion?: string | null;
    platformName?: string | null;
    platformVersion?: string | null;
    sdkVersion?: string | null;
    protocolVersion?: string | null;
}

export interface Settings {
    dubbing?: number | null;
    echo?: number | null;
    ttsEngine?: string | null;
    asrEngine?: string | null;
    asrAutoStop?: number | null;
    devMode?: number | null;
    authConnector?: string | null;
    surface?: string | null;
}

export type EventsType = {
    connecting: () => void;
    ready: () => void;
    close: () => void;
    message: (message: OriginalMessageType) => void;
    systemMessage: (systemMessageData: SystemMessageDataType, originalMessage: OriginalMessageType) => void;
    outcoming: (message: OriginalMessageType) => void;
    connectionError: (error: Event) => void;
};

export type ItemType = Partial<BubbleCommand> &
    Partial<CardCommand> &
    Partial<ActionCommand> & {
        command?:
            | Omit<AssistantSmartAppData, 'sdk_meta'>
            | Omit<AssistantSystemCommand, 'sdk_meta'>
            | Omit<AssistantNavigationCommand, 'sdk_meta'>
            | {
                  type: string;
                  [k: string]: unknown;
              };
    };

export type EmotionId =
    | 'bespokoistvo'
    | 'idle'
    | 'igrivost'
    | 'laugh'
    | 'listen'
    | 'load'
    | 'neznayu'
    | 'ok_prinyato'
    | 'oups'
    | 'podavleniye_gneva'
    | 'predvkusheniye'
    | 'simpatiya'
    | 'smushchennaya_ulibka'
    | 'talk'
    | 'udovolstvie'
    | 'vinovatiy'
    | 'zadumalsa'
    | 'zhdu_otvet';

export type SystemMessageDataType = {
    activate_app_info?: boolean;
    app_info?: AppInfo;
    auto_listening: boolean;
    items?: Array<ItemType>;
    suggestions?: Suggestions;
    character?: Character;
    emotion?: {
        emotionId: EmotionId;
    };
    server_action?: AssistantServerAction;
    meta?:
        | {
              current_app: {
                  app_info: AppInfo;
                  state: AssistantAppState;
              };
          }
        | Meta;
    sdk_meta?: SdkMeta;
};

export interface OriginalMessageType {
    messageId: number | Long;
    last: number;
    messageName: string;
    token?: string | null;
    userId?: string | null;
    vpsToken?: string | null;
    version?: number;
    bytes?: {
        data?: Uint8Array | null;
        desc?: string | null;
    } | null;
    voice?: { data?: Uint8Array | null } | null;
    text?: {
        data?: string | null;
        type?: string | null;
    } | null;
    status?: {
        code?: number | null;
        description?: string | null;
        technicalDescription?: string | null;
    } | null;
    initialSettings?: {
        userId?: string | null;
        userChannel?: string | null;
        device?: Device | null;
        settings?: Settings | null;
        locale?: string | null;
    } | null;
    cancel?: {} | null;
    device?: Device | null;
    legacyDevice?: LegacyDevice | null;
    settings?: Settings | null;
    systemMessage?: {
        data?: string | null;
    } | null;
    timestamp?: number | Long | null;
    meta?: { [k: string]: string } | null;
}

export interface WSCreator {
    (url: string): WebSocket;
}

export interface FakeVpsParams {
    createFakeWS: WSCreator;
}

export type VpsConfiguration = {
    url: string;
    userId: string;
    userChannel: string;
    locale?: string; // с версии 4 - обязателен
    device?: IDevice;
    settings: ISettings; // version >= 2
    fakeVps?: FakeVpsParams;
    legacyDevice?: ILegacyDevice; // для версии 1 - нужен legacyDevice
    version: VpsVersion;
    messageName?: string;
    vpsToken?: string;
    meta?: { [k: string]: string };
    logger?: ClientLogger;
    getToken: () => Promise<string>;
};

export interface IncomingMessage {
    type: 'incoming';
    text?: { data?: string | null };
    message?: { data: SystemMessageDataType; name: string; sdk_meta?: SdkMeta };
}

export interface OutcomingMessage {
    type: 'outcoming';
    text?: { data?: string | null };
    message?: { data: { server_action?: any; [key: string]: any }; name: string; sdk_meta?: SdkMeta };
}

export type ClientLoggerInitEntryData = Omit<VpsConfiguration, 'getToken' | 'logger'> & { token: string };
export type ClientLoggerInitEntry = { type: 'init'; params: ClientLoggerInitEntryData };
export type ClientLoggerIncomingEntry = { type: 'incoming'; message: Message };
export type ClientLoggerOutcomingEntry = { type: 'outcoming'; message: Message };
export type ClientLoggerEntry = ClientLoggerInitEntry | ClientLoggerIncomingEntry | ClientLoggerOutcomingEntry;

export interface ClientLogger {
    (entry: ClientLoggerEntry): void;
}

export interface AssistantRecord {
    parameters?: ClientLoggerInitEntryData;
    entries: Array<IncomingMessage | OutcomingMessage>;
    version: string;
}

export interface RecordSaver {
    save: (record: object) => void;
}

export interface AssistantSettings {
    dubbing?: boolean;
    echo?: number | null;
    ttsEngine?: string | null;
    asrEngine?: string | null;
    asrAutoStop?: number | null;
    devMode?: number | null;
    authConnector?: string | null;
    surface?: string | null;
}

export type AssistantPostMessage =
    | {
          type: 'sendDataContainer';
          payload: string;
      }
    | {
          type: 'close';
      }
    | {
          type: 'sendData';
          payload: string;
      }
    | {
          type: 'setSuggests';
          payload: string;
      }
    | {
          type: 'setHints';
          payload: string;
      }
    | {
          type: 'ready';
      }
    | {
          type: 'onStart';
      }
    | {
          type: 'onData';
          payload: AssistantClientCommand;
      }
    | {
          type: 'onRequestState';
          requestId: string;
      }
    | {
          type: 'onRequestRecoveryState';
      }
    | {
          type: 'state';
          payload: Record<string, unknown> | undefined;
          requestId: string;
      }
    | {
          type: 'recoveryState';
          payload: unknown;
      };

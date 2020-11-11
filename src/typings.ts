import { IDevice, ILegacyDevice, ISettings, Message } from './proto';

export enum VpsVersion {
    '1.0' = 1,
    '2.0' = 2,
    '3.0' = 3,
    '4.0' = 4,
    '5.0' = 5,
}

export interface DPMessage {
    messageName: 'SERVER_ACTION' | 'MESSAGE_TO_SKILL' | string;
    messageId: string;
    sessionId: string;
    meta: {
        current_app: {
            state: AssistantAppState;
        };
    };
    uuid: {
        userId: string;
        userChannel: string;
    };
    systemMessage?: {
        data: {
            app_info: {};
            server_action: {};
        };
    };
    payload: {
        applicationId: string;
        appversionId: string;
        message: {
            original_text?: string;
        };
        device: {
            type: string;
            locale: string;
            timezone: string;
            install_id: string;
            capabilities?: {};
        };
        intent?: string;
    };
}

export interface AssistantAppState {
    /* Любые данные, которые могут потребоваться Backend'у для принятия решений */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    item_selector?: {
        ignored_words?: string[];
        /* Список соответствий голосовых команд действиям в веб-приложении */
        items: AssistantViewItem[];
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AssistantViewItem {
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
    /* Экшен, выполяет действие от имени пользователя */
    action?: AssistantAction | { type: string };
    /* Дополнительные данные для бэкенда */
    [key: string]: any;
}

export type AssistantAction = AssistantDeepLinkAction | AssistantTextAction;

export interface AssistantTextAction {
    type: 'text';
    /* Строка из поля text будет отправлена в чат от имени пользователя */
    text: string;
    /* default = true, true если сообщение нужно отобразить в чате и отправить в бекэнд,
        false если сообщение нужно только отобразить в чате, и не отправлять на бекэнд */
    should_send_to_backend?: boolean;
}

export interface AssistantDeepLinkAction {
    type: 'deep_link';
    /* https ссылки будут открыты в браузере, а android-app://ru.sberbankmoblie/... - будут открыты в приложении */
    deep_link: string;
}

export interface AssistantServerActionAppInfo {
    projectId: string;
    applicationId?: string;
    appversionId?: string;
}

export interface AssistantServerAction {
    /* действие, понятное бекенду */
    action_id: string;
    app_info?: AssistantServerActionAppInfo;
    /* любые параметры */
    parameters?: Record<string, any>;
}

export type AssistantCommands =
    | AssistantActionCommand
    | AssistantCharacterCommand
    | AssistantCloseAppCommand
    | AssistantNavigationCommand
    | AssistantSmartAppCommand
    | AssistantPlayerCommand
    | AssistantSystemCommand;

export interface AssistantActionCommand {
    type: 'action';
    action: { type: 'deep_link'; deep_link: string };
}

export interface AssistantCharacterCommand {
    type: 'character';
    character: {
        id: 'sber' | 'eva' | 'joy';
    };
    sdkMeta?: {
        mid?: number;
        requestId?: string;
    };
}

export interface AssistantCloseAppCommand {
    type: 'close_app';
}

export interface AssistantNavigationCommand {
    type: 'navigation';
    navigation: { command: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'BACK' | 'FORWARD' };
    sdkMeta?: {
        mid?: number;
        requestId?: string;
    };
}

export interface AssistantSmartAppCommand {
    type: 'smart_app_data';
    smart_app_data: {
        command: string;
        [key: string]: unknown;
    };
    sdkMeta?: {
        mid?: number;
        requestId?: string;
    };
}

export interface AssistantPlayerCommand {
    type: 'player_command';
    player_command: { [key: string]: unknown };
}

export interface AssistantSystemCommand {
    type: 'system';
    system: { command: string; [key: string]: unknown };
}

export interface AssistantClient {
    onStart?: () => void;
    onRequestState?: () => Record<string, any>;
    onRequestRecoveryState?: () => any;
    onData?: (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => void;
}

export interface AssistantHost {
    close: () => void;
    ready: () => void;
    sendData: (action: string, message: string | null) => void;
    sendDataContainer: (container: string) => void;
    setSuggest: (suggest: string) => void;
}

export interface AssistantWindow {
    AssistantHost?: AssistantHost;
    AssistantClient?: AssistantClient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appInitialData: Array<any>;
    appRecoveryState: any;

    __dangerouslySendDataMessage?: (data: {}, name: string) => void;
    __dangerouslySendVoiceMessage?: (message: string) => void;
    __dangerouslyGetAssistantAppState?: () => AssistantAppState;
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
};

export type AppInfoType = {
    applicationId: string;
    appversionId: string;
    frontendEndpoint: string;
    frontendType: string;
    projectId: string;
};

export type itemType = {
    bubble?: {
        text: string;
    };
    card?: {
        cells: Array<any>;
        type: 'list_card';
    };
    command: any;
};

export type SuggestionButtonType = {
    title: string;
    action: AssistantAction;
};

export type SystemMessageDataType = {
    app_info: AppInfoType;
    items: Array<itemType>;
    suggestions?: {
        buttons: Array<SuggestionButtonType>;
    };
    character?: {
        id: 'sber' | 'eva' | 'joy';
    };
    sdk_meta?: {
        requestId?: string;
    };
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
    device?: Device | null;
    legacyDevice?: LegacyDevice | null;
    settings?: Settings | null;
    systemMessage?: {
        data?: string | null;
    } | null;
}

export type CreateClientDataType = {
    url: string;
    userId: string;
    token: string;
    userChannel: string;
    locale?: string; // с версии 4 - обязателен
    device?: IDevice;
    settings: ISettings; // version >= 2
    legacyDevice?: ILegacyDevice; // для версии 1 - нужен legacyDevice
    version: VpsVersion;
    messageName?: string;
    vpsToken?: string;
};

export interface IncomingMessage {
    type: 'incoming';
    text?: { data?: string | null };
    message?: { data: SystemMessageDataType; name: string };
}

export interface OutcomingMessage {
    type: 'outcoming';
    text?: { data?: string | null };
    message?: { data: Record<string, any>; name: string };
}

export interface AssistantRecord {
    parameters?: CreateClientDataType;
    entries: Array<IncomingMessage | OutcomingMessage>;
    version: string;
}

export interface ClientLogger {
    logInit: (params: CreateClientDataType) => void;
    logIncoming: (message: Message) => void;
    logOutcoming: (message: Message) => void;
}

export interface LogRecorder {
    getRecord: () => AssistantRecord;
    start: () => void;
    stop: () => void;
}

export interface RecordPlayer {
    continue: () => boolean;
    play: () => void;
    setRecord: (record: AssistantRecord) => void;
}

export interface RecordSaver {
    save: (record: AssistantRecord) => void;
}

export interface VoicePlayerSettings {
    startVoiceDelay?: number;
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

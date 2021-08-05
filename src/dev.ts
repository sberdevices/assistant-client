/* eslint-disable @typescript-eslint/camelcase, no-underscore-dangle */

import { AppEvent, createAssistant, CreateAssistantDevOptions, VpsEvent } from './assistant/assistant';
import { renderNativePanel, NativePanelParams } from './NativePanel/NativePanel';
import {
    SystemMessageDataType,
    ClientLogger,
    AssistantSettings,
    AssistantSmartAppCommand,
    Suggestions,
    CharacterId,
    AssistantAppState,
    AssistantClientCommand,
    AssistantSystemCommand,
} from './typings';
import { renderAssistantRecordPanel } from './record';
import { createCallbackLogger } from './record/callback-logger';
import { createConsoleLogger } from './record/console-logger';
import { createLogCallbackRecorder, RecorderCallback } from './record/callback-recorder';
import { createRecordDownloader } from './record/record-downloader';
import { createRecoveryStateRepository } from './createRecoveryStateRepository';

const SDK_VERSION = '20.09.1.3576';
const APP_VERSION = 'process.env.APP_VERSION';

const FEATURES = JSON.stringify({
    appTypes: ['DIALOG', 'WEB_APP'],
});

const legacyDevice = {
    clientType: 'simple',
    channel: 'Android_SB',
    channelVersion: '8.1.0.2932_RC',
    platformName: 'WEBDBG 1.0',
    platformVersion: '1.0',
};

export type InitializeAssistantSDKParams = {
    initPhrase: string;
    url: string;
    /** канал (влияет на навыки) */
    userChannel: string;
    /** поверхность (влияет на навыки) */
    surface: string;
    userId?: string;
    token?: string;
    /** версия хост-приложения (может влиять на навыки) */
    surfaceVersion?: string;
    deviceId?: string;
    locale?: string;
    nativePanel?: NativePanelParams | null;
    /** версия sdk (может влиять на навыки) */
    sdkVersion?: string;
    /** показать управление записью лога сообщений */
    enableRecord?: boolean;
    recordParams?: {
        // параметры логирования сообщений
        defaultActive?: boolean;
        logger?: ClientLogger;
    };
    settings?: AssistantSettings;
    vpsVersion?: number;
    features?: string;
    capabilities?: string;
} & CreateAssistantDevOptions;

export const initializeAssistantSDK = ({
    initPhrase,
    url,
    userChannel,
    surface,
    userId = `webdbg_userid_${
        Math.random().toString(36).substring(2, 13) + Math.random().toString(36).substring(2, 13)
    }`,
    token = `webdbg_eribtoken_${
        Math.random().toString(36).substring(2, 13) + Math.random().toString(36).substring(2, 13)
    }`,
    surfaceVersion,
    deviceId,
    locale = 'ru',
    nativePanel = {
        defaultText: 'Покажи что-нибудь',
        render: renderNativePanel,
    },
    sdkVersion = SDK_VERSION,
    enableRecord,
    recordParams,
    settings = {},
    vpsVersion = 3,
    features,
    capabilities,
    getMeta,
}: InitializeAssistantSDKParams) => {
    const device = {
        platformType: 'WEBDBG',
        platformVersion: '1.0',
        sdkVersion,
        surface,
        surfaceVersion: surfaceVersion || APP_VERSION,
        features: features ?? FEATURES,
        capabilities:
            capabilities ??
            JSON.stringify({
                screen: { available: true, width: window?.innerWidth, height: window?.innerHeight },
                speak: { available: true },
            }),
        deviceId,
        additionalInfo: JSON.stringify({
            host_app_id: 'ru.sberbank.sdakit.demo',
            sdk_version: sdkVersion,
        }),
    };

    const recoveryStateRepository = createRecoveryStateRepository();
    let clientLogger = recordParams?.logger ? recordParams.logger : createConsoleLogger();
    let loggerCb: RecorderCallback;
    const recorder = createLogCallbackRecorder(
        (subscribe: RecorderCallback) => {
            loggerCb = subscribe;
        },
        recordParams?.defaultActive != null ? recordParams.defaultActive : true,
    );
    const saver = createRecordDownloader();

    if (enableRecord && recordParams?.logger == null) {
        clientLogger = createCallbackLogger((logEntry) => loggerCb && loggerCb(logEntry));
    }

    const assistant = createAssistant({
        url,
        userId,
        userChannel,
        locale,
        device,
        legacyDevice,
        settings: {
            ...settings,
            dubbing: settings.dubbing === false ? -1 : 1,
            echo: settings.echo || -1,
        },
        version: vpsVersion,
        logger: clientLogger,
        getMeta,
        getToken: () => Promise.resolve(token),
    });

    let appInfo: SystemMessageDataType['app_info'] | undefined;
    const initialSmartAppData: Array<AssistantClientCommand> = [];
    let clientReady = false; // флаг готовности клиента к приему onData
    let assistantReady = false; // флаг готовности контекста ассистента
    let character: CharacterId;

    const sendText = (text: string) => {
        assistant.sendText(text);
    };

    const emitOnData = (command: AssistantClientCommand) => {
        if (clientReady && assistantReady && window.AssistantClient?.onData) {
            window.AssistantClient.onData(command);
        }
    };

    const fn = async () => {
        const res = await assistant.start({ initPhrase });

        if (initPhrase && res) {
            initialSmartAppData.push({
                type: 'insets',
                insets: { left: 0, top: 0, right: 0, bottom: 144 },
                sdk_meta: { mid: '-1' },
            });

            appInfo = res?.app_info;
            if (res?.character) {
                character = res?.character.id;
                initialSmartAppData.push({ type: 'character', character: res.character, sdk_meta: { mid: '-1' } });
            }

            for (const item of res?.items || []) {
                if (item.command != null && item.command.type === 'smart_app_data') {
                    initialSmartAppData.push({
                        ...(item.command as AssistantSmartAppCommand),
                        sdk_meta: { mid: '-1' },
                    });
                }
            }

            window.appInitialData = initialSmartAppData;

            if (appInfo && appInfo.applicationId) {
                assistant.setActiveApp(appInfo, () =>
                    Promise.resolve((window.AssistantClient?.onRequestState?.() || {}) as AssistantAppState),
                );
                window.appRecoveryState = recoveryStateRepository.get(appInfo.applicationId);
            }

            if (clientReady && window.AssistantClient?.onData) {
                window.AssistantClient?.onStart && window.AssistantClient?.onStart();
            }

            assistantReady = true;

            for (const smartAppData of initialSmartAppData) {
                emitOnData(smartAppData);
            }
        }
    };

    const promise = fn();

    window.appInitialData = [];
    window.appRecoveryState = null;
    window.AssistantHost = {
        close() {
            if (appInfo && appInfo.applicationId) {
                recoveryStateRepository.remove(appInfo.applicationId);
                if (window.AssistantClient?.onRequestRecoveryState) {
                    recoveryStateRepository.set(appInfo.applicationId, window.AssistantClient.onRequestRecoveryState());
                }
            }

            assistant.closeApp();
            initialSmartAppData.splice(0, initialSmartAppData.length);
            window.appRecoveryState = null;
        },
        ready() {
            if (assistantReady && window.AssistantClient?.onData) {
                window.AssistantClient?.onStart && window.AssistantClient?.onStart();
            }

            clientReady = true;
        },
        async sendData(payload: string, messageName: string | null = null) {
            await promise;
            assistant.sendServerAction(JSON.parse(payload), messageName || undefined);
        },
        async sendDataContainer(container: string) {
            await promise;

            const { data, message_name: messageName, requestId } = JSON.parse(container);
            assistant.sendServerAction(data, messageName || 'SERVER_ACTION', requestId);
        },
        setSuggest() {},
    };

    const subscribeToListenerStatus = (cb: (event: 'listen' | 'stopped') => void): (() => void) =>
        assistant.on('assistant', (event) => {
            if (event.emotion) {
                cb(event.emotion === 'listen' ? 'listen' : 'stopped');
            }
        });
    const subscribeToListenerHypotesis = (cb: (hypotesis: string, last: boolean) => void): (() => void) =>
        assistant.on('assistant', (event) => {
            if (event.asr) {
                cb(event.asr.text, typeof event.asr.last === 'undefined' ? false : event.asr.last);
            }
        });

    const updateDevUI = (suggestions: Suggestions['buttons'] = [], bubbleText = '') => {
        if (nativePanel) {
            const { render, ...props } = nativePanel;

            (render || renderNativePanel)({
                ...props,
                sendText,
                sendServerAction: assistant.sendServerAction,
                onListen: assistant.listen,
                suggestions: suggestions || [],
                bubbleText,
                onSubscribeListenStatus: subscribeToListenerStatus,
                onSubscribeHypotesis: subscribeToListenerHypotesis,
            });
        }
    };

    assistant.on('app', (event: AppEvent) => {
        switch (event.type) {
            case 'close':
                window.AssistantHost?.close();
                break;
            case 'command':
                emitOnData(event.command as AssistantSmartAppCommand);
                break;
            case 'run':
            default:
                break;
        }
    });

    assistant.on('vps', (event: VpsEvent) => {
        if (event.type !== 'incoming') {
            return;
        }

        const { systemMessage } = event;
        let bubbleText = '';

        for (const item of systemMessage.items || []) {
            if (item.bubble) {
                bubbleText = item.bubble.text;
            }

            if (item.command) {
                if (
                    item.command.type === 'system' &&
                    (item.command as AssistantSystemCommand).system.command.toUpperCase() === 'BACK'
                ) {
                    window.history.back();
                    return;
                }
            }
        }

        if (systemMessage.character && systemMessage.character.id !== character) {
            character = systemMessage.character.id;
            emitOnData({ type: 'character', character: systemMessage.character, sdk_meta: { mid: '-1' } });
        }

        updateDevUI(systemMessage.suggestions?.buttons ?? [], bubbleText);
    });

    updateDevUI();
    enableRecord && renderAssistantRecordPanel(recorder, saver);

    window.__dangerouslySendTextMessage = sendText;

    return {
        sendText,
    };
};

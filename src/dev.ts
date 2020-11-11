/* eslint-disable no-unused-expressions, @typescript-eslint/camelcase, no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-ts-ignore */

import { createClient } from './client';
import { renderNativePanel, NativePanelParams } from './NativePanel/NativePanel';
import {
    SystemMessageDataType,
    SuggestionButtonType,
    ClientLogger,
    VoicePlayerSettings,
    AssistantSettings,
} from './typings';
import { createAudioRecorder } from './createAudioRecorder';
import { renderAssistantRecordPanel } from './record';
import { createCallbackLogger } from './record/callback-logger';
import { createConsoleLogger } from './record/console-logger';
import { createLogCallbackRecorder, RecorderCallback } from './record/callback-recorder';
import { createRecordDownloader } from './record/record-downloader';

const SDK_VERSION = '20.09.1.3576';
const APP_VERSION = '20.09.1.3576';

const CAPABILITIES = JSON.stringify({
    screen: { available: true, width: window.innerWidth, height: window.innerHeight },
    speak: { available: true },
});

const FEATURES = JSON.stringify({
    appTypes: ['DIALOG', 'WEB_APP'],
});

export const legacyDevice = {
    clientType: 'simple',
    channel: 'Android_SB',
    channelVersion: '8.1.0.2932_RC',
    platformName: 'WEBDBG 1.0',
    platformVersion: '1.0',
};

export const initializeAssistantSDK = ({
    initPhrase,
    url,
    userChannel,
    surface,
    userId = `webdbg_userid_${
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }`,
    token = `webdbg_eribtoken_${
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
    voiceSettings,
}: {
    initPhrase: string;
    url: string;
    userChannel: string;
    surface: string;
    userId?: string;
    token?: string;
    surfaceVersion?: string; // версия хост (андроид) приложения
    deviceId?: string;
    locale?: string;
    nativePanel?: NativePanelParams | null;
    sdkVersion?: string; // версия sdk
    enableRecord?: boolean; // показать управление записью лога сообщений
    recordParams?: {
        // параметры логирования сообщений
        defaultActive?: boolean;
        logger?: ClientLogger;
    };
    settings?: AssistantSettings;
    voiceSettings?: VoicePlayerSettings;
}) => {
    const device = {
        platformType: 'WEBDBG',
        platformVersion: '1.0',
        sdkVersion,
        surface,
        surfaceVersion: surfaceVersion || APP_VERSION,
        features: FEATURES,
        capabilities: CAPABILITIES,
        deviceId,
        additionalInfo: JSON.stringify({
            host_app_id: 'ru.sberbank.sdakit.demo',
            sdk_version: sdkVersion,
        }),
    };

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

    const vpsClient = createClient(
        {
            url,
            userId,
            token,
            userChannel,
            locale,
            device,
            legacyDevice,
            settings: {
                ...settings,
                dubbing: settings.dubbing === false ? -1 : 1,
                echo: settings.echo || -1,
            },
            version: 3,
        },
        clientLogger,
        voiceSettings,
    );

    let appInfo: SystemMessageDataType['app_info'] | void;
    const initialSmartAppData: Array<SystemMessageDataType['items'][0]['command']> = [];
    const requestIdMap: Record<string, string> = {};
    let clientReady = false; // флаг готовности клиента к приему onData
    let assistantReady = false; // флаг готовности контекста ассистента
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state: any = null;

    const createSystemMessageBase = () => {
        return {
            app_info: appInfo,
            meta: {
                current_app: {
                    app_info: appInfo,
                    state,
                },
            },
        };
    };

    const sendServerAction = ({
        data,
        message_name,
        requestId,
    }: {
        data: any;
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        message_name?: string | null;
        requestId?: string;
    }) => {
        let messageId: number | undefined;

        if (requestId) {
            messageId = Date.now();
            requestIdMap[messageId.toString()] = requestId;
        }

        return vpsClient.sendSystemMessage(
            {
                data: {
                    ...createSystemMessageBase(),
                    server_action: data,
                },
                messageName: message_name || 'SERVER_ACTION',
            },
            undefined,
            messageId,
        );
    };

    const updateState = () => {
        if (window.AssistantClient?.onRequestState) {
            state = window.AssistantClient.onRequestState();
        }
    };

    const sendText = (text: string, params: {} = {}) => {
        updateState();

        return vpsClient.batch(({ sendText, sendSystemMessage }) => {
            state &&
                sendSystemMessage(
                    {
                        data: {
                            ...createSystemMessageBase(),
                        },
                        messageName: '',
                    },
                    false,
                );
            return sendText(text, params);
        });
    };

    const fn = async () => {
        await new Promise((resolve) => {
            vpsClient.on('ready', resolve);
        });

        await vpsClient.sendSystemMessage({ data: {}, messageName: 'OPEN_ASSISTANT' });

        if (initPhrase) {
            const res = await vpsClient.sendText(initPhrase);
            appInfo = res?.app_info;
            res?.character && initialSmartAppData.push({ type: 'character', character: res.character });

            for (const item of res?.items || []) {
                if (item.command != null) {
                    initialSmartAppData.push(item.command);
                }
            }

            if (clientReady && window.AssistantClient?.onData) {
                window.AssistantClient?.onStart && window.AssistantClient?.onStart();
                for (const smartAppData of initialSmartAppData) {
                    window.AssistantClient.onData(smartAppData);
                }
            }

            assistantReady = true;
        }
    };

    const promise = fn();

    window.appInitialData = initialSmartAppData;
    window.AssistantHost = {
        close() {
            appInfo = undefined;
            initialSmartAppData.splice(0, initialSmartAppData.length);
            state = null;

            sendText('Хватит'); // нужно слать close_app
        },
        ready() {
            if (assistantReady && window.AssistantClient?.onData) {
                window.AssistantClient?.onStart && window.AssistantClient?.onStart();
                for (const smartAppData of initialSmartAppData) {
                    window.AssistantClient.onData(smartAppData);
                }
            }

            clientReady = true;
        },
        async sendData(payload: string, messageName: string | null = null) {
            await promise;

            updateState();

            sendServerAction({ data: JSON.parse(payload), message_name: messageName || undefined });
        },
        async sendDataContainer(container: string) {
            await promise;

            updateState();

            sendServerAction(JSON.parse(container));
        },
        setSuggest() {},
    };

    const createVoiceStream = () => {
        updateState();

        return vpsClient.createVoiceStream(createSystemMessageBase());
    };

    const updateDevUI = (suggestions: SuggestionButtonType[] = [], bubbleText = '') => {
        if (nativePanel) {
            const { render, ...props } = nativePanel;

            (render || renderNativePanel)({
                ...props,
                sendText,
                createVoiceStream,
                suggestions,
                bubbleText,
            });
        }
    };

    vpsClient.on('systemMessage', (message, original) => {
        let bubbleText = '';

        for (const item of message.items) {
            if (item.bubble) {
                bubbleText = item.bubble.text;
            }

            if (item.command) {
                if (clientReady && assistantReady && window.AssistantClient?.onData) {
                    window.AssistantClient.onData({
                        ...item.command,
                        sdkMeta: { mid: original.messageId, requestId: requestIdMap[original.messageId.toString()] },
                    });
                }
            }
        }

        updateDevUI(message.suggestions?.buttons ?? [], bubbleText);
    });

    updateDevUI();
    enableRecord && renderAssistantRecordPanel(recorder, saver);

    return {
        sendText,
        createVoiceStream,
        createAudioRecorder,
        on: vpsClient.on,
        destroy: vpsClient.destroy,
    };
};

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
    AssistantCharacterType,
    AssistantCharacterCommand,
    AssistantNavigationCommand,
    AssistantSmartAppCommand,
    OriginalMessageType,
} from './typings';
import { renderAssistantRecordPanel } from './record';
import { createCallbackLogger } from './record/callback-logger';
import { createConsoleLogger } from './record/console-logger';
import { createLogCallbackRecorder, RecorderCallback } from './record/callback-recorder';
import { createRecordDownloader } from './record/record-downloader';
import { createVoiceListener } from './createVoiceListener';
import { createVoicePlayer } from './createVoicePlayer';

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
    vpsVersion = 3,
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
    vpsVersion?: number;
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

    const voicePlayer = createVoicePlayer(voiceSettings);
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
            version: vpsVersion,
        },
        clientLogger,
    );

    let appInfo: SystemMessageDataType['app_info'] | void;
    const initialSmartAppData: Array<SystemMessageDataType['items'][0]['command']> = [];
    const requestIdMap: Record<string, string> = {};
    let clientReady = false; // флаг готовности клиента к приему onData
    let assistantReady = false; // флаг готовности контекста ассистента
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state: any = null;
    let character: AssistantCharacterType;

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
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
        voicePlayer.active = false;
        voicePlayer.active = true;
        updateState();

        return vpsClient.batch(({ sendText: batchedSendText, sendSystemMessage }) => {
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
            return batchedSendText(text, params);
        });
    };

    const fn = async () => {
        await new Promise((resolve) => {
            vpsClient.on('ready', resolve);
        });

        await vpsClient.sendSystemMessage({ data: {}, messageName: 'OPEN_ASSISTANT' });

        if (initPhrase) {
            const messageId = vpsClient.currentMessageId;
            const res = await vpsClient.sendText(initPhrase);
            appInfo = res?.app_info;
            if (res?.character) {
                character = res?.character.id;
                initialSmartAppData.push({ type: 'character', character: res.character });
            }

            for (const item of res?.items || []) {
                if (item.command != null) {
                    initialSmartAppData.push({ ...item.command, sdkMeta: { mid: messageId } });
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

    const voiceListener = createVoiceListener();
    const subscribeToListenerStatus = (cb: (event: 'listen' | 'stopped') => void): (() => void) =>
        voiceListener.on('status', cb);
    const subscribeToListenerHypotesis = (cb: (hypotesis: string, last: boolean) => void): (() => void) =>
        voiceListener.on('hypotesis', cb);
    voiceListener.on('status', (status: 'listen' | 'stopped') => {
        if (status === 'listen') {
            voicePlayer.active = false;
        } else {
            voicePlayer.active = true;
        }
    });
    const handleListen = () => {
        if (voiceListener.status === 'listen') {
            voiceListener.stop();
            return;
        }

        updateState();

        vpsClient.batch(({ sendSystemMessage, sendVoice, messageId }) => {
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

            voiceListener.listen({
                sendVoice,
                messageId,
                onMessage: (cb: (message: OriginalMessageType) => void) => vpsClient.on('message', cb),
            });
        });
    };

    const updateDevUI = (suggestions: SuggestionButtonType[] = [], bubbleText = '') => {
        if (nativePanel) {
            const { render, ...props } = nativePanel;

            (render || renderNativePanel)({
                ...props,
                sendText,
                onListen: handleListen,
                suggestions: suggestions || [],
                bubbleText,
                onSubscribeListenStatus: subscribeToListenerStatus,
                onSubscribeHypotesis: subscribeToListenerHypotesis,
            });
        }
    };

    const emitOnData = (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => {
        if (clientReady && assistantReady && window.AssistantClient?.onData) {
            window.AssistantClient.onData(command);
        }
    };

    vpsClient.on('systemMessage', (message, original) => {
        let bubbleText = '';

        for (const item of message.items) {
            if (item.bubble) {
                bubbleText = item.bubble.text;
            }

            if (item.command) {
                emitOnData({
                    ...item.command,
                    sdkMeta: { mid: original.messageId, requestId: requestIdMap[original.messageId.toString()] },
                });
            }
        }

        if (message.character && message.character.id !== character) {
            character = message.character.id;
            emitOnData({ type: 'character', character: message.character });
        }

        updateDevUI(message.suggestions?.buttons ?? [], bubbleText);
    });

    vpsClient.on('message', (message: OriginalMessageType) => {
        if (message.voice) {
            voicePlayer.append(
                message.voice.data || new Uint8Array(),
                message.messageId.toString(),
                message.last === 1,
            );
        }
    });

    updateDevUI();
    enableRecord && renderAssistantRecordPanel(recorder, saver);

    return {
        sendText,
        on: vpsClient.on,
        destroy: vpsClient.destroy,
    };
};

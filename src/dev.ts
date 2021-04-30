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
import { createRecoveryStateRepository } from './createRecoveryStateRepository';
import { createMusicRecognizer } from './createMusicRecognizer';
import { createSpeechRecognizer } from './createSpeechRecognizer';
import { createVoicePlayer } from './voice-player';

const SDK_VERSION = '20.09.1.3576';
const APP_VERSION = 'process.env.APP_VERSION';

const CAPABILITIES = JSON.stringify({
    screen: { available: true, width: window.innerWidth, height: window.innerHeight },
    speak: { available: true },
});

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
    voiceSettings,
    vpsVersion = 3,
    features,
    capabilities,
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
    features?: string;
    capabilities?: string;
}) => {
    const device = {
        platformType: 'WEBDBG',
        platformVersion: '1.0',
        sdkVersion,
        surface,
        surfaceVersion: surfaceVersion || APP_VERSION,
        features: features ?? FEATURES,
        capabilities: capabilities ?? CAPABILITIES,
        deviceId,
        additionalInfo: JSON.stringify({
            host_app_id: 'ru.sberbank.sdakit.demo',
            sdk_version: sdkVersion,
        }),
    };

    const voicePlayer = createVoicePlayer(voiceSettings);
    const recoveryStateRepository = createRecoveryStateRepository();
    let autolistenMesId: string | null = null;
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

    let appInfo: SystemMessageDataType['app_info'] | undefined;
    const initialSmartAppData: Array<SystemMessageDataType['items'][0]['command']> = [];
    const requestIdMap: Record<string, string> = {};
    let clientReady = false; // флаг готовности клиента к приему onData
    let assistantReady = false; // флаг готовности контекста ассистента
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state: unknown = null;
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

    const emitOnData = (command: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => {
        if (clientReady && assistantReady && window.AssistantClient?.onData) {
            window.AssistantClient.onData(command);
        }
    };

    const fn = async () => {
        await new Promise((resolve) => {
            vpsClient.on('ready', resolve);
        });

        await vpsClient.sendSystemMessage({ data: {}, messageName: 'OPEN_ASSISTANT' });

        if (initPhrase) {
            initialSmartAppData.push({
                type: 'insets',
                insets: { left: 0, top: 0, right: 0, bottom: 144 },
                sdk_meta: { mid: '-1' },
            });

            const messageId = vpsClient.currentMessageId;
            const res = await vpsClient.sendText(initPhrase);
            appInfo = res?.app_info;
            if (res?.character) {
                character = res?.character.id;
                initialSmartAppData.push({ type: 'character', character: res.character, sdk_meta: { mid: '-1' } });
            }

            for (const item of res?.items || []) {
                if (item.command != null) {
                    initialSmartAppData.push({ ...item.command, sdk_meta: { mid: messageId.toString() } });
                }
            }

            window.appInitialData = initialSmartAppData;

            if (appInfo && appInfo.applicationId) {
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

            appInfo = undefined;
            initialSmartAppData.splice(0, initialSmartAppData.length);
            state = null;
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
    const speechRecognizer = createSpeechRecognizer(voiceListener);
    const musciRecognizer = createMusicRecognizer(voiceListener);
    const subscribeToListenerStatus = (cb: (event: 'listen' | 'stopped') => void): (() => void) =>
        voiceListener.on('status', cb);
    const subscribeToListenerHypotesis = (cb: (hypotesis: string, last: boolean) => void): (() => void) =>
        speechRecognizer.on('hypotesis', cb);
    voiceListener.on('status', (status: 'listen' | 'stopped') => {
        if (status === 'listen') {
            voicePlayer.active = false;
        } else {
            voicePlayer.active = true;
        }
    });

    const handleListen = () => {
        autolistenMesId = null;
        if (speechRecognizer.status === 'active') {
            speechRecognizer.stop();
            return;
        }

        if (musciRecognizer.status === 'active') {
            musciRecognizer.stop();
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

            speechRecognizer.start({
                sendVoice,
                messageId,
                onMessage: (cb: (message: OriginalMessageType) => void) => vpsClient.on('message', cb),
            });
        });
    };

    const handleMusicRecognize = () => {
        autolistenMesId = null;
        if (speechRecognizer.status === 'active') {
            speechRecognizer.stop();
            return;
        }

        if (musciRecognizer.status === 'active') {
            musciRecognizer.stop();
            return;
        }

        vpsClient.batch(({ sendVoice, messageId }) => {
            musciRecognizer.start({
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

    voicePlayer.on('end', (messageId) => {
        if (autolistenMesId === messageId) {
            handleListen();
        }
    });

    vpsClient.on('systemMessage', (message, original) => {
        let bubbleText = '';

        if (message.auto_listening) {
            autolistenMesId = original.messageId.toString();
        }

        for (const item of message.items) {
            if (item.bubble) {
                bubbleText = item.bubble.text;
            }

            if (item.command) {
                if (
                    item.command.type.toLowerCase() === 'close_app' &&
                    appInfo &&
                    appInfo.applicationId === message.app_info?.applicationId
                ) {
                    window.AssistantHost?.close();
                    return;
                }

                if (item.command.type.toLowerCase() === 'start_music_recognition') {
                    handleMusicRecognize();
                    return;
                }

                if (item.command.type === 'system' && item.command.system?.command?.toUpperCase() === 'BACK') {
                    window.history.back();
                    return;
                }

                emitOnData({
                    ...item.command,
                    sdk_meta: {
                        mid: original.messageId.toString(),
                        requestId: requestIdMap[original.messageId.toString()],
                    },
                });
            }
        }

        if (message.character && message.character.id !== character) {
            character = message.character.id;
            emitOnData({ type: 'character', character: message.character, sdk_meta: { mid: '-1' } });
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

    window.__dangerouslySendTextMessage = sendText;

    return {
        sendText,
        on: vpsClient.on,
        destroy: vpsClient.destroy,
    };
};

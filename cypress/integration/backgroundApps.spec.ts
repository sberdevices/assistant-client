/* eslint-disable @typescript-eslint/camelcase */
/// <reference types="cypress" />
import { Server, WebSocket } from 'mock-socket';

import { initProtocol, sendMessage } from '../support/helpers/socket.helpers';
import { Message } from '../../src/proto';
import { createAssistantClient, AppInfo } from '../../src/index';

describe('Проверяем backgroundApps', () => {
    let server: Server;
    const SOCKET_URL = 'ws://test.com';
    const USER_CHANNEL = 'COMPANION_B2C';
    const SURFACE = 'COMPANION';
    const APPS = [
        {
            projectId: 'test-1-projectId',
            applicationId: 'test-1-applicationId',
            appversionId: 'test-1-appversionId',
            frontendType: 'EMBEDDED_APP',
        },
        {
            projectId: 'test-2-projectId',
            applicationId: 'test-2-applicationId',
            appversionId: 'test-2-appversionId',
            frontendType: 'WEB_APP',
        },
    ];

    const getState = () => Promise.resolve({});

    const initAssistant = () =>
        createAssistantClient({
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            userId: 'webdbg_userid_6f141a9rg4tmt8mvun9x6',
            getToken: () => Promise.resolve('token'),
            legacyDevice: undefined,
            locale: 'ru',
            device: {
                surface: SURFACE,
                platformType: 'web',
                platformVersion: '1',
                surfaceVersion: '1',
                features: '',
                capabilities: '',
                deviceId: 'deviceid_rgbohdnn3jr78q03y9duq6',
                deviceManufacturer: '',
                deviceModel: '',
                additionalInfo: '',
            },
            settings: {
                authConnector: 'developer_portal_jwt',
                dubbing: 1,
                echo: -1,
                ttsEngine: '',
                asrEngine: '',
                asrAutoStop: -1,
            },
            version: 5,
        });

    let assistant = initAssistant();

    const onSocketReady = (callback: (socket: WebSocket) => void) => {
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket);

            callback(socket);
        });
    };

    const onSocketMessage = (subscriber: (message: Message) => void) => {
        onSocketReady((socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));

                subscriber(message);
            });
        });
    };

    beforeEach(() => {
        cy.stub(window, 'WebSocket').callsFake((url) => new WebSocket(url));
        server = new Server(SOCKET_URL);
        assistant = initAssistant();
    });

    afterEach(() => {
        if (server) {
            server.stop();
            server = undefined;
        }
    });

    it('Апп добавляется и удаляется', (done) => {
        const stubOnSystemMessageApps = cy.stub();
        const tryExpect = () => {
            if (stubOnSystemMessageApps.callCount === 2) {
                expect(stubOnSystemMessageApps).to.calledWith([
                    { app_info: APPS[0], state: {} },
                    { app_info: APPS[1], state: {} },
                ]);
                expect(stubOnSystemMessageApps).to.calledWith([]);
                done();
            }
        };

        onSocketMessage((message) => {
            if (message.systemMessage) {
                const backgroundApps = JSON.parse(message.systemMessage.data).meta.background_apps;
                stubOnSystemMessageApps(backgroundApps);
                tryExpect();
            }
        });

        const backgroundApps = APPS.map((appInfo) => assistant.addBackgroundApp({ appInfo, getState }));
        assistant.start();

        backgroundApps.forEach((app) => app.remove());
        assistant.start();
    });

    it('Подписчики для аппа добавляются и удаляются', (done) => {
        const stubOnBackgroundAppCommand = cy.stub();
        const app = assistant.addBackgroundApp({ appInfo: APPS[0], getState });
        const clearAppSubscribers = app.onCommand(stubOnBackgroundAppCommand).clearSubscribers;
        const command = {
            type: 'smart_app_data',
            smart_app_data: { myData: 'hello' },
        };

        let sendCommandToApp: (mid: number) => void;
        const tryExpect = () => {
            sendCommandToApp(1234);
            clearAppSubscribers();
            sendCommandToApp(1235);

            expect(stubOnBackgroundAppCommand).calledOnceWith(
                {
                    ...command,
                    sdk_meta: {
                        mid: '1234',
                        requestId: undefined,
                    },
                },
                '1234',
            );
            done();
        };

        onSocketReady((socket) => {
            sendCommandToApp = (mid) => {
                sendMessage(socket, mid, {
                    systemMessageData: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        auto_listening: false,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        app_info: APPS[0],
                        items: [{ command }],
                    },
                });
            };

            tryExpect();
        });

        assistant.start();
    });

    it('SystemMessages с сервера для аппа отправляются в этот апп', (done) => {
        const stubOnBackgroundApp1Command = cy.stub();
        const stubOnBackgroundApp2Command = cy.stub();
        const command = {
            type: 'smart_app_data',
            smart_app_data: { myData: 'hello' },
        };

        let sendCommandToApp: (appInfo: AppInfo, mid: number) => void;
        const tryExpect = () => {
            sendCommandToApp(APPS[0], 1234);
            sendCommandToApp(APPS[1], 1235);

            expect(stubOnBackgroundApp1Command).calledOnceWith(
                {
                    ...command,
                    sdk_meta: {
                        mid: '1234',
                        requestId: undefined,
                    },
                },
                '1234',
            );
            expect(stubOnBackgroundApp2Command).calledOnceWith(
                {
                    ...command,
                    sdk_meta: {
                        mid: '1235',
                        requestId: undefined,
                    },
                },
                '1235',
            );
            done();
        };

        onSocketReady((socket) => {
            sendCommandToApp = (app_info, mid) => {
                sendMessage(socket, mid, {
                    systemMessageData: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        auto_listening: false,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        app_info,
                        items: [{ command }],
                    },
                });
            };

            tryExpect();
        });

        const app1 = assistant.addBackgroundApp({ appInfo: APPS[0], getState });
        app1.onCommand(stubOnBackgroundApp1Command);

        const app2 = assistant.addBackgroundApp({ appInfo: APPS[1], getState });
        app2.onCommand(stubOnBackgroundApp2Command);

        assistant.start();
    });

    it('ServerAction на сервер отправляется в сценарий аппа', (done) => {
        const actionToBackgroundApp = { name: 'Ivan' };
        const actionToCurrentApp = { name: 'Nicolas' };

        const app = assistant.addBackgroundApp({ appInfo: APPS[0], getState });

        assistant.start();

        onSocketMessage((message) => {
            if (message.systemMessage) {
                const data = JSON.parse(message.systemMessage.data);

                if (data.app_info?.applicationId === APPS[0].applicationId) {
                    expect(data.server_action).to.be.eqls(actionToBackgroundApp);
                    done();
                }
            }
        });

        app.sendServerAction(actionToBackgroundApp);
        assistant.sendServerAction(actionToCurrentApp);
    });

    it('На сервер отправляется правильный getState аппа', (done) => {
        const stubOnSystemMessage = cy.stub();
        const appStates = [{ state: 1 }, { state: 2 }, { state: 3 }];
        const tryExpect = () => {
            if (stubOnSystemMessage.callCount === appStates.length) {
                appStates.forEach((appState) => {
                    expect(stubOnSystemMessage).calledWith(appState);
                });

                done();
            }
        };

        let appState = appStates[0];

        assistant.addBackgroundApp({
            appInfo: APPS[0],
            getState: () => Promise.resolve(appState),
        });

        assistant.start();

        onSocketMessage((message) => {
            if (message.systemMessage) {
                const data = JSON.parse(message.systemMessage.data);

                stubOnSystemMessage(data.meta.background_apps[0].state);

                tryExpect();
            }
        });

        // eslint-disable-next-line prefer-destructuring
        appState = appStates[1];
        assistant.sendServerAction({});
        // eslint-disable-next-line prefer-destructuring
        appState = appStates[2];
        assistant.sendServerAction({});
    });
});

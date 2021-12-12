/* eslint-disable @typescript-eslint/camelcase */
/// <reference types="cypress" />
import { Server, WebSocket } from 'mock-socket';

import { initProtocol, sendMessage } from '../support/helpers/socket.helpers';
import { Message } from '../../src/proto';
import { createAssistantClient, AppInfo } from '../../src/index';

describe('Проверяем backgroundApps', () => {
    let server: undefined | Server;
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
    });

    afterEach(() => {
        if (server) {
            server.stop();
            server = undefined;
        }
    });

    it('Апп добавляется и удаляется', () => {
        const stubOnSystemMessageApps = cy.stub();

        onSocketMessage((message) => {
            if (message.systemMessage) {
                const backgroundApps = JSON.parse(message.systemMessage.data).meta.background_apps;
                stubOnSystemMessageApps(backgroundApps);
            }
        });

        const assistant = initAssistant();

        const backgroundApps = APPS.map((appInfo) => assistant.addBackgroundApp({ appInfo, getState }));
        assistant.start();

        backgroundApps.forEach((app) => app.remove());
        assistant.start();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000).then(() => {
            expect(stubOnSystemMessageApps).to.calledWith([
                { app_info: APPS[0], state: {} },
                { app_info: APPS[1], state: {} },
            ]);
            expect(stubOnSystemMessageApps).to.calledWith([]);
        });
    });

    it('Подписчики для аппа добавляются и удаляются', () => {
        const stubOnBackgroundAppCommand = cy.stub();

        const appInfo = APPS[0];
        const command = {
            type: 'smart_app_data',
            smart_app_data: { myData: 'hello' },
        };

        let sendCommandToApp: (mid: number) => void;

        onSocketReady((socket) => {
            sendCommandToApp = (mid) => {
                sendMessage(socket, mid, {
                    systemMessageData: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        auto_listening: false,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        app_info: appInfo,
                        items: [{ command }],
                    },
                });
            };
        });

        const assistant = initAssistant();
        const app = assistant.addBackgroundApp({ appInfo, getState });
        const clearAppSubscribers = app.onCommand(stubOnBackgroundAppCommand).clearSubscribers;

        assistant.start();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000).then(() => {
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
        });
    });

    it('SystemMessages с сервера для аппа отправляются в этот апп', () => {
        const stubOnBackgroundApp1Command = cy.stub();
        const stubOnBackgroundApp2Command = cy.stub();

        const appInfo1 = APPS[0];
        const appInfo2 = APPS[1];
        const command = {
            type: 'smart_app_data',
            smart_app_data: { myData: 'hello' },
        };

        let sendCommandToApp: (appInfo: AppInfo, mid: number) => void;

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
        });

        const assistant = initAssistant();

        const app1 = assistant.addBackgroundApp({ appInfo: appInfo1, getState });
        app1.onCommand(stubOnBackgroundApp1Command);

        const app2 = assistant.addBackgroundApp({ appInfo: appInfo2, getState });
        app2.onCommand(stubOnBackgroundApp2Command);

        assistant.start();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000).then(() => {
            sendCommandToApp(appInfo1, 1234);
            sendCommandToApp(appInfo2, 1235);

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
        });
    });

    it('ServerAction на сервер отправляется в сценарий аппа', () => {
        const stubOnServerAction = cy.stub();

        const assistant = initAssistant();
        const app = assistant.addBackgroundApp({ appInfo: APPS[0], getState });

        assistant.start();

        onSocketMessage((message) => {
            if (message.systemMessage) {
                const data = JSON.parse(message.systemMessage.data);

                if (data.app_info?.appversionId === APPS[0].appversionId) {
                    stubOnServerAction(data.server_action);
                }
            }
        });

        const actionToBackgroundApp = { name: 'Ivan' };
        const actionToCurrentApp = { name: 'Nicolas' };

        app.sendServerAction(actionToBackgroundApp);
        assistant.sendServerAction(actionToCurrentApp);

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000).then(() => {
            expect(stubOnServerAction).calledOnceWith(actionToBackgroundApp);
        });
    });
});

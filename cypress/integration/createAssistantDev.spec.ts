/// <reference types="cypress" />
import { Server, WebSocket } from 'mock-socket';

import { APP_INFO, initProtocol } from '../support/helpers/socket.helpers';
import { createAssistantDev } from '../../src/index';
import { Message } from '../../src/proto';
import {
    AssistantClientCustomizedCommand,
    AssistantNavigationCommand,
    AssistantSmartAppCommand,
    SystemMessageDataType,
} from '../../src/typings';
import { createAnswerBuffer } from '../support/helpers/clientMethods.helpers';

/* eslint-disable @typescript-eslint/camelcase */

const INSETS = { left: 0, top: 0, right: 0, bottom: 144 };
const CHARACTER = 'sber';

describe('Проверяем createAssistantDev', () => {
    const SOCKET_URL = 'ws://test.com';
    const USER_CHANNEL = 'TEST_CHANNEL';
    const SURFACE = 'TEST_SURFACE';
    const INIT_PHRASE = 'RUN TEST APP';
    let server: undefined | Server;

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

    it('Проверяем инициализацию ассистента - ожидаем отправку OPEN_ASSISTANT, InitalSettings, initPhrase', (done) => {
        let settingsReceived: boolean;
        let openReceived: boolean;
        let phraseReceived: boolean;
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket);

            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (message.messageName === 'OPEN_ASSISTANT') {
                    openReceived = true;
                }

                if (message.initialSettings) {
                    settingsReceived =
                        message.initialSettings.userChannel === USER_CHANNEL &&
                        message.initialSettings.device.surface === SURFACE &&
                        message.initialSettings.device.platformType === 'WEBDBG';
                }

                if (message.text && message.text.data === INIT_PHRASE) {
                    phraseReceived = true;
                }

                // eslint-disable-next-line eqeqeq
                if (openReceived != undefined && settingsReceived != undefined && phraseReceived != undefined) {
                    expect(openReceived, 'OPEN_ASSISTANT получен').to.be.true;
                    expect(settingsReceived, 'initialSetting получен').to.be.true;
                    expect(phraseReceived, 'initPhrase получен').to.be.true;
                    done();
                }
            });
        });

        createAssistantDev({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });
    });

    it('Проверяем заполнение appInitialData - после onStart ожидаем insets, и все что пришло в ответ на initPhrase', (done) => {
        const COMMAND: AssistantSmartAppCommand = {
            type: 'smart_app_data',
            smart_app_data: { type: 'test_command' },
        };
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE, items: [{ command: COMMAND }] });
        });

        const assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        const status = { character: false, data: false, insets: false };
        assistant.on('start', () => {
            const items = window.appInitialData;
            for (let i = 0; i < items.length; i++) {
                const command = items[i];
                switch (command.type) {
                    case 'character':
                        status.character = true;
                        expect(command.character.id).to.equal(CHARACTER);
                        break;
                    case 'insets':
                        status.insets = true;
                        expect(command.insets).to.deep.equal(INSETS);
                        break;
                    case 'smart_app_data':
                        status.data = true;
                        expect(command.smart_app_data).to.deep.equal(COMMAND.smart_app_data);
                        break;
                    default:
                        throw new Error('Unexpected command');
                }
            }

            if (status.character && status.insets && status.data) {
                done();
            }
        });
    });

    it('Проверяем appInitialData - должно приходить в onData в dev-режиме', (done) => {
        const COMMAND: AssistantSmartAppCommand = {
            type: 'smart_app_data',
            smart_app_data: { type: 'test_command' },
        };
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE, items: [{ command: COMMAND }] });
        });

        const assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        const status = { character: false, data: false, insets: false };
        assistant.on('data', (command) => {
            switch (command.type) {
                case 'character':
                    status.character = true;
                    expect(command.character.id).to.equal(CHARACTER);
                    break;
                case 'insets':
                    status.insets = true;
                    expect(command.insets).to.deep.equal(INSETS);
                    break;
                case 'smart_app_data':
                    status.data = true;
                    expect(command.smart_app_data).to.deep.equal(COMMAND.smart_app_data);
                    break;
                default:
                    throw new Error('Unexpected command');
            }

            if (status.character && status.insets && status.data) {
                done();
            }
        });
    });

    it('Проверяем оповещение подписчиков о старте', (done) => {
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE });
        });

        const assistant = createAssistantDev({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', done);
    });

    it('Проверяем вызов send_data - ожидаем мессадж с app_info и стейтом в нем', (done) => {
        const state = { item_selector: { items: [] }, key: 'TEST' };

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE });

            socket.on('message', (mes) => {
                const message = Message.decode((mes as Uint8Array).slice(4));
                if (message.systemMessage?.data && message.systemMessage?.data !== '{}') {
                    const data: SystemMessageDataType = JSON.parse(message.systemMessage.data);
                    const { app_info, server_action, meta } = data;

                    if (!app_info || app_info.frontendStateId !== APP_INFO.frontendStateId) {
                        return;
                    }

                    expect(server_action).to.ok;
                    expect(meta).to.ok;

                    switch (data.server_action.action_id) {
                        case 'first':
                            expect(meta.current_app.app_info).to.deep.equal(APP_INFO);
                            expect(meta.current_app.state).to.deep.equal(state);
                            done();
                            break;
                        default:
                            break;
                    }
                }
            });
        });

        const assistant = createAssistantDev({
            getState: () => state,
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', () => {
            assistant.sendData({ action: { action_id: 'first' } });
        });
    });

    it('Проверяем подписку sendAction - ожидаем срабатывание подписки', (done) => {
        const smartAppData = { type: 'test_data' };

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE });

            socket.on('message', (mes) => {
                const message = Message.decode((mes as Uint8Array).slice(4));

                if (message.systemMessage?.data && message.systemMessage?.data !== '{}') {
                    const { server_action }: SystemMessageDataType = JSON.parse(message.systemMessage.data);

                    if (server_action?.type !== 'test_action') {
                        return;
                    }

                    socket.send(
                        createAnswerBuffer({
                            messageId: message.messageId,
                            systemMessageData: JSON.stringify({
                                items: [{ command: { type: 'smart_app_data', smart_app_data: smartAppData } }],
                                app_info: APP_INFO,
                            }),
                            last: message.last,
                        }),
                    );
                }
            });
        });

        const assistant = createAssistantDev({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', () => {
            assistant.sendAction({ type: 'test_action', payload: {} }, (data) => {
                expect(data).to.be.deep.eq(smartAppData);
                done();
            });
        });
    });

    it('Проверяем оповещение подписчиков при получении команд от ассистента', (done) => {
        const data: AssistantSmartAppCommand = { type: 'smart_app_data', smart_app_data: { type: 'TEST_COMMAND' } };
        const navigation: AssistantNavigationCommand = { type: 'navigation', navigation: { command: 'DOWN' } };
        const received = { character: false, navigation: false, data: false, insets: false };
        let handleStart: () => void;

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, {
                initPhrase: INIT_PHRASE,
            });

            handleStart = () => {
                socket.send(
                    createAnswerBuffer({
                        systemMessageData: JSON.stringify({
                            app_info: APP_INFO,
                            items: [{ command: data }, { command: navigation }],
                        }),
                    }),
                );
            };
        });

        const assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', () => {
            setTimeout(handleStart);
        });

        assistant.on('data', (command: AssistantClientCustomizedCommand<AssistantSmartAppCommand>) => {
            switch (command.type) {
                case 'smart_app_data':
                    received.data = true;
                    expect(command.smart_app_data).to.deep.equal(data.smart_app_data);
                    break;
                case 'navigation':
                    received.navigation = true;
                    expect(command.navigation).to.deep.equal(navigation.navigation);
                    break;
                case 'character':
                case 'insets':
                    break;
                default:
                    throw new Error('Unexpected command');
                    break;
            }

            if (received.data && received.navigation) {
                done();
            }
        });
    });

    it('Проверяем оповещение при смене персонажа - ожидаем первым сообщением "sber", вторым -  "joy"', (done) => {
        const characterId = 'joy';
        let handleStart: () => void;

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE });

            handleStart = () =>
                socket.send(
                    createAnswerBuffer({
                        systemMessageData: JSON.stringify({
                            character: { id: characterId },
                        }),
                    }),
                );
        });

        const assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', () => {
            setTimeout(handleStart);
        });

        assistant.on('data', (command: AssistantClientCustomizedCommand<AssistantSmartAppCommand>) => {
            if (command.type === 'character' && command.character.id === characterId) {
                done();
            }
        });
    });

    it('Проверяем восстановление recoveryState', (done) => {
        const recoveryState = { type: 'recovery_state', item_selector: { items: [] } };

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, { initPhrase: INIT_PHRASE });
        });

        let assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            getRecoveryState: () => recoveryState,
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('start', () => {
            assistant.close();

            assistant = createAssistantDev<AssistantSmartAppCommand>({
                getState: () => ({}),
                getRecoveryState: () => recoveryState,
                url: SOCKET_URL,
                userChannel: USER_CHANNEL,
                surface: SURFACE,
                initPhrase: INIT_PHRASE,
            });

            assistant.on('start', () => {
                expect(assistant.getRecoveryState()).to.deep.equal(recoveryState);
                done();
            });
        });
    });

    it("Проверяем реакцию на system.command = 'back' - не должна попадать в onData, должна вызывать window.history.back()", (done) => {
        const onData = cy.stub();
        const historyBack = cy.stub();

        cy.stub(window.history, 'back', historyBack);

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            setTimeout(() =>
                socket.send(
                    createAnswerBuffer({
                        systemMessageData: JSON.stringify({
                            items: [{ command: { type: 'system', system: { command: 'BACK' } } }],
                        }),
                    }),
                ),
            );
        });

        const assistant = createAssistantDev<AssistantSmartAppCommand>({
            getState: () => ({}),
            getRecoveryState: () => ({}),
            url: SOCKET_URL,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            initPhrase: INIT_PHRASE,
        });

        assistant.on('data', onData);
        setTimeout(() => {
            expect(historyBack).to.calledOnce;
            expect(onData).to.not.called;
            done();
        }, 100);
    });
});

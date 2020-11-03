/// <reference types="cypress" />
import { WebSocket, Server } from 'mock-socket';

import { initProtocol } from '../support/helpers/socket.helpers';
import { initializeAssistantSDK } from '../../src/dev';
import { Message, SystemMessage } from '../../src/proto';
import { AssistantAppState, SystemMessageDataType } from '../../src/typings';

const INIT_PHRASE = 'Integration test';
const USER_CHANNEL = 'TEST_CHANNEL';
const SURFACE = 'TEST_SURFACE';
const SOCKET_URL = 'ws://test.com';
describe('Проверяем', () => {
    let server: undefined | Server;

    beforeEach(() => {
        server = new Server(SOCKET_URL);
        cy.stub(window, 'WebSocket').callsFake((url) => new WebSocket(url));
    });

    afterEach(() => {
        if (server) {
            server.stop();
            server = undefined;
        }
    });

    it('Корректная инициализация ассистента по-умолчанию - ожидаем отправку OPEN_ASSISTANT, InitalSettings, initPhrase', (done) => {
        let settingsReceived: boolean;
        let openReceived: boolean;
        let phraseReceived: boolean;
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket);

            socket.on('message', (data: Uint8Array) => {
                const message = Message.decode(data.slice(4));
                if (message.messageName === 'OPEN_ASSISTANT' && message.systemMessage?.data === '{}') {
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

        initializeAssistantSDK({
            url: SOCKET_URL,
            initPhrase: INIT_PHRASE,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            nativePanel: null,
        });
    });

    it('Отправка текстового экшена и контекста к нему - ожидаем два мессаджа с одинаковым messageId', (done) => {
        const actionText = 'test action';
        const state: AssistantAppState = { type: 'test_state' };
        let action: Message;
        let context: Message;
        let doneCalled = false;

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket);

            socket.on('message', (data: Uint8Array) => {
                const message = Message.decode(data.slice(4));
                if (message.text && message.text.data === actionText) {
                    action = message;
                }

                if (message.systemMessage && message.systemMessage.data !== '{}') {
                    context = message;
                }

                if (action && context && !doneCalled) {
                    const data = JSON.parse(context.systemMessage?.data);
                    doneCalled = true;

                    expect(action.messageId, 'Ожидаем одинаковый messageId').to.be.eq(context.messageId);
                    expect(action.last === context.last * -1, 'Один из мессаджей должен быть last = 1').to.be.true;
                    expect(data.meta?.current_app?.state, 'Стейты совпадают').to.deep.eq(state);
                    done();
                }
            });
        });

        window.AssistantClient = {
            onRequestState: () => state,
        };

        const assistant = initializeAssistantSDK({
            url: SOCKET_URL,
            initPhrase: INIT_PHRASE,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            nativePanel: null,
        });

        assistant.sendText(actionText);
    });
});

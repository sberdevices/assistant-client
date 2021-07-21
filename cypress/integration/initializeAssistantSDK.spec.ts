/// <reference types="cypress" />
import { WebSocket, Server } from 'mock-socket';

import { initProtocol } from '../support/helpers/socket.helpers';
import { initializeAssistantSDK } from '../../src/dev';
import { Message } from '../../src/proto';
import { AssistantAppState } from '../../src/typings';

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

    it('Отправка текстового экшена и контекста к нему - ожидаем два мессаджа с одинаковым messageId', (done) => {
        const actionText = 'test action';
        const state: AssistantAppState = { type: 'test_state' };
        let action: Message;
        let context: Message;
        let doneCalled = false;

        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';
            initProtocol(socket, {
                initPhrase: INIT_PHRASE,
            });

            socket.on('message', (mes) => {
                const message = Message.decode((mes as Uint8Array).slice(4));
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
            onData: () => {},
            onRequestState: () => state,
            onStart: () => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                assistant.sendText(actionText);
            },
        };

        const assistant = initializeAssistantSDK({
            url: SOCKET_URL,
            initPhrase: INIT_PHRASE,
            userChannel: USER_CHANNEL,
            surface: SURFACE,
            nativePanel: null,
        });

        window.AssistantHost.ready();
    });
});

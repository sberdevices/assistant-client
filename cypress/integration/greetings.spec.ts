/// <reference types="cypress" />

import { Server } from 'mock-socket';

import { createAssistantClient } from '../../src';
import { Message } from '../../src/proto';

describe('Проверяем приветствие', () => {
    const configuration = {
        settings: {},
        token: '',
        url: 'ws://path',
        userChannel: '',
        userId: '',
        version: 5,
    };

    let server: Server;

    beforeEach(() => {
        server = new Server(configuration.url);
    });

    afterEach(() => {
        if (server) {
            server.stop();
        }
    });

    it('Приветствие включено, первая сессия', (done) => {
        server.on('connection', (socket) => {
            assert.isOk('Соединение после старта');

            socket.on('message', (data) => {
                const { messageName, systemMessage } = Message.decode(data.slice(4));

                if (messageName === 'OPEN_ASSISTANT' && systemMessage.data === '{"is_first_session":true}') {
                    assert.isOk('Отправлен "OPEN_ASSISTANT" и "is_first_session"');

                    done();
                }
            });
        });

        const assistantClient = createAssistantClient(configuration);

        assistantClient.start();
    });

    it('Приветствие включено, не первая сессия', (done) => {
        server.on('connection', (socket) => {
            assert.isOk('Соединение после старта');

            socket.on('message', (data) => {
                const { messageName, systemMessage } = Message.decode(data.slice(4));

                if (messageName === 'OPEN_ASSISTANT' && systemMessage.data === '{}') {
                    assert.isOk('Отправлен "OPEN_ASSISTANT"');

                    done();
                }
            });
        });

        const assistantClient = createAssistantClient(configuration);

        localStorage.setItem('SALUTE_HAD_FIRST_SESSION', 'true');

        assistantClient.start();
    });

    it('Приветствие выключено', (done) => {
        const onMessage = cy.stub();

        server.on('connection', (socket) => {
            socket.on('message', onMessage);
        });

        const assistantClient = createAssistantClient(configuration);

        assistantClient.start({ disableGreetings: true });

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
            .then(() => {
                expect(onMessage, 'Нет соединения после старта').to.not.called;

                assistantClient.sendText('text');
            })
            .wait(500)
            .then(() => {
                expect(onMessage, 'Соединение, отправлен текст').to.called;
            })
            .then(done);
    });
});

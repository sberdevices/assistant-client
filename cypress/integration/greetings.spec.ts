/// <reference types="cypress" />

import { Server } from 'mock-socket';

import { createAssistantClient } from '../../src';
import { Message } from '../../src/proto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;

describe('Проверяем приветствие', () => {
    const configuration = {
        settings: {},
        getToken: () => Promise.resolve(''),
        url: 'ws://path',
        userChannel: '',
        userId: '',
        version: 5,
    };

    const checkStartAssistant = (
        server: Server,
        args: ArgumentsType<ReturnType<typeof createAssistantClient>['start']>,
        onMessage: (message: Message) => void,
    ): ReturnType<typeof createAssistantClient> => {
        server.on('connection', (socket) => {
            assert.isOk('Соединение после старта');

            socket.on('message', (data) => {
                onMessage(Message.decode((data as Uint8Array).slice(4)));
            });
        });

        const assistantClient = createAssistantClient(configuration);

        assistantClient.start(...args);

        return assistantClient;
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
        checkStartAssistant(
            server,
            [{ disableGreetings: false, isFirstSession: true }],
            ({ messageName, systemMessage }) => {
                if (messageName === 'OPEN_ASSISTANT' && systemMessage.data === '{"is_first_session":true}') {
                    assert.isOk('Отправлен "OPEN_ASSISTANT" и "is_first_session"');

                    done();
                }
            },
        );
    });

    it('Приветствие включено, не первая сессия', (done) => {
        checkStartAssistant(
            server,
            [{ disableGreetings: false, isFirstSession: false }],
            ({ messageName, systemMessage }) => {
                if (messageName === 'OPEN_ASSISTANT' && systemMessage.data === '{}') {
                    assert.isOk('Отправлен "OPEN_ASSISTANT"');

                    done();
                }
            },
        );
    });

    it('Приветствие выключено', (done) => {
        const onMessage = cy.stub();

        const assistantClient = checkStartAssistant(
            server,
            [{ disableGreetings: true, isFirstSession: false }],
            onMessage,
        );

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

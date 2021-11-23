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
        beforeStart?: (assistant: ReturnType<typeof createAssistantClient>) => void,
    ): ReturnType<typeof createAssistantClient> => {
        server.on('connection', (socket) => {
            assert.isOk('Соединение после старта');

            socket.on('message', (data) => {
                onMessage(Message.decode((data as Uint8Array).slice(4)));
            });
        });

        const assistantClient = createAssistantClient(configuration);

        beforeStart && beforeStart(assistantClient);

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
                if (messageName === 'OPEN_ASSISTANT') {
                    const data = JSON.parse(systemMessage.data);

                    expect(data.is_first_session, 'Отправлен "is_first_session"').be.true;
                    expect(data.meta.current_app.app_info.systemName, 'Отправлен current_app assistant').be.eq(
                        'assistant',
                    );

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
                if (messageName === 'OPEN_ASSISTANT') {
                    const data = JSON.parse(systemMessage.data);

                    expect(data.is_first_session, 'Не отправлен "is_first_session"').be.eq(undefined);
                    expect(data.meta.current_app.app_info.systemName, 'Отправлен current_app assistant').be.eq(
                        'assistant',
                    );
                    assert.isOk('Отправлен "OPEN_ASSISTANT"');

                    done();
                }
            },
        );
    });

    it('Приветствие включено, текущий апп НЕ assistant', (done) => {
        const onMessage = cy.stub();

        const assistantClient = checkStartAssistant(server, [{ isFirstSession: true }], onMessage, (client) => {
            client.setActiveApp({
                projectId: 'test',
                applicationId: 'test',
                appversionId: 'test',
                frontendType: 'WEB_APP',
                frontendEndpoint: 'https://example.com',
            });
        });

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

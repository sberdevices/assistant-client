/// <reference types="cypress" />

import { Server } from 'mock-socket';

import { createAssistantClient } from '../../src';
import { Message } from '../../src/proto';

describe('Проверяем изменение настроек озвучки', () => {
    const defaultDubbing = -1;
    const configuration = {
        settings: { dubbing: defaultDubbing },
        getToken: () => Promise.resolve(''),
        url: 'ws://path',
        userChannel: '',
        userId: '',
        version: 5,
    };

    let server: Server;
    let assistantClient: ReturnType<typeof createAssistantClient>;

    beforeEach(() => {
        server = new Server(configuration.url);

        assistantClient = createAssistantClient(configuration);
    });

    afterEach(() => {
        if (server) {
            server.stop();
        }
    });

    it('Вызов changeSettings должен отправлять Settings - если соединение активно', (done) => {
        let phase: 1 | 2 = 1;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (phase === 1 && message.initialSettings) {
                    expect(message.initialSettings.settings.dubbing, 'dubbing при старте получен').to.equal(
                        defaultDubbing,
                    );
                    assistantClient.changeSettings({ disableDubbing: defaultDubbing !== -1 });
                    phase = 2;
                } else if (phase === 2 && message.settings) {
                    expect(message.settings.dubbing, 'изменения dubbing получены').to.equal(defaultDubbing * -1);
                    done();
                }
            });
        });
        assistantClient.start();
    });

    it('Вызов changeSettings не должен менять настройки протокола и отправлять Settings - если dubbing не поменялся', (done) => {
        let settingsReceived = false;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (message.initialSettings) {
                    expect(message.initialSettings.settings.dubbing, 'dubbing при старте получен').to.equal(
                        defaultDubbing,
                    );
                    assistantClient.changeSettings({ disableDubbing: defaultDubbing === -1 });
                }

                if (message.settings) {
                    settingsReceived = true;
                }
            });
        });

        assistantClient.start();
        cy.wait(1000).then(() => {
            assert.isFalse(settingsReceived, 'Настройки были отправлены');
            done();
        });
    });

    it('Вызов changeSettings должен менять настройки протокола и не отправлять Settings - если соединение неактивно', (done) => {
        let settingsReceived = false;
        let phase: 1 | 2 = 1;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (message.initialSettings) {
                    if (phase === 1) {
                        expect(message.initialSettings.settings.dubbing, 'dubbing при старте получен').to.equal(
                            defaultDubbing,
                        );
                        server.clients()[0].close();
                        assistantClient.changeSettings({ disableDubbing: defaultDubbing !== -1 });
                        phase = 2;
                        return;
                    }

                    expect(message.initialSettings.settings.dubbing, 'dubbing при рестарте получен').to.equal(
                        defaultDubbing * -1,
                    );
                    done();
                }

                if (message.settings) {
                    settingsReceived = true;
                }
            });
        });

        assistantClient.start();
        cy.wait(1000).then(() => {
            assert.isFalse(settingsReceived, 'Настройки были отправлены');
            assistantClient.start();
        });
    });
});

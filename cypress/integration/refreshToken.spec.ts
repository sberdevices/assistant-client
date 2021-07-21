/// <reference types="cypress" />

import { Server } from 'mock-socket';

import { createAssistantClient } from '../../src';
import { Message } from '../../src/proto';
import { sendMessage } from '../support/helpers/socket.helpers';

describe('Проверяем обновление токена', () => {
    const token1 = 'token1';
    const token2 = 'token2';
    const configuration = {
        settings: {},
        token: token1,
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
        assistantClient.protocol.on('incoming', (mes) => {
            const { status } = mes;
            // код ошибки валидации токена = -45
            if (status && status.code === -45) {
                assistantClient.changeConfiguration({ token: token2 });
            }
        });
    });

    afterEach(() => {
        if (server) {
            server.stop();
        }
    });

    it('Старт с невалидным токеном', (done) => {
        const phrase = 'Проверка токена';
        let phase: 1 | 2 | 3 = 1;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (phase === 1 && message.initialSettings) {
                    // 1. старт, отвечаем что токен невалиден
                    expect(message.token, 'первый токен получен').to.deep.equal(token1);
                    phase = 2;
                    server.clients()[0].close();
                    sendMessage(socket, 1, { statusData: { code: -45 } }, { messageName: 'VPS_CLIENT' });
                } else if (phase === 2 && message.initialSettings) {
                    // 2. ожидаем обновленный токен
                    expect(message.token, 'второй токен получен').to.deep.equal(token2);
                    phase = 3;
                } else if (phase === 3 && message.text) {
                    // 3. после токена должно прийти изначальное сообщение
                    expect(message.text.data, 'Текст получен').to.deep.equal(phrase);
                    done();
                }
            });
        });

        assistantClient.sendText(phrase);
    });

    it('Токен становится невалиден после реконнекта', (done) => {
        const phrase1 = 'Проверка токена 1';
        const phrase2 = 'Проверка токена 2';
        let phase: 1 | 2 | 3 | 4 | 5 = 1;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (phase === 1 && message.initialSettings) {
                    // 1. первый старт, считаем токен валидным
                    expect(message.token, 'первый токен получен - валиден').to.deep.equal(token1);
                    phase = 2;
                } else if (phase === 2 && message.text?.data) {
                    // 2. должен прийти phrase1, закрываем сокет и отправляем phrase2
                    expect(message.text.data, 'Текст получен').to.deep.equal(phrase1);
                    phase = 3;
                    server.clients()[0].close();
                    setTimeout(() => assistantClient.sendText(phrase2), 100);
                } else if (phase === 3 && message.initialSettings) {
                    // 3. считаем первый токен невалидным
                    expect(message.token, 'первый токен получен - невалиден').to.deep.equal(token1);
                    phase = 4;
                    sendMessage(socket, 1, { statusData: { code: -45 } }, { messageName: 'VPS_CLIENT' });
                } else if (phase === 4 && message.initialSettings) {
                    // 4. ожидаем новый токен
                    expect(message.token, 'второй токен получен').to.deep.equal(token2);
                    phase = 5;
                } else if (phase === 5 && message.text?.data) {
                    // 5. ожидаем phrase2
                    expect(message.text.data, 'Текст получен').to.deep.equal(phrase2);
                    done();
                }
            });
        });

        assistantClient.sendText(phrase1);
    });

    it('Обновление токена, должно поднимать сокет, если он был закрыт', (done) => {
        const phrase = 'Проверка токена';
        let phase: 1 | 2 | 3 = 1;

        server.on('connection', (socket) => {
            socket.on('message', (data) => {
                const message = Message.decode((data as Uint8Array).slice(4));
                if (phase === 1 && message.initialSettings) {
                    // 1. первый старт, считаем токен валидным
                    expect(message.token, 'первый токен получен').to.deep.equal(token1);
                    phase = 2;
                } else if (phase === 2 && message.text?.data) {
                    // 2. должен прийти phrase, отвечаем, что токен невалиден, закрываем сокет
                    expect(message.text.data, 'Текст получен').to.deep.equal(phrase);
                    expect(message.token, 'первый токен получен - невалиден').to.deep.equal(token1);
                    phase = 3;
                    server.clients()[0].close();
                    sendMessage(socket, 1, { statusData: { code: -45 } }, { messageName: 'VPS_CLIENT' });
                } else if (phase === 3 && message.initialSettings) {
                    // 3. Ожидаем новый токен
                    expect(message.token, 'второй токен получен').to.deep.equal(token2);
                    done();
                }
            });
        });

        assistantClient.sendText(phrase);
    });
});

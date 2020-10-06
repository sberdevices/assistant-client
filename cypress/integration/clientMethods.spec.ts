/// <reference types="cypress" />
import { WebSocket, Server } from 'mock-socket';

import { Message } from '../../src/proto';
import { createAnswerBuffer, createServerPong, getClient } from '../support/helpers/clientMethods.helpers';

const socketUrl = 'ws://test.com';
describe('Тестирование файла client.ts на корректность работы с vps-сервером', () => {
    let server: undefined | Server;

    beforeEach(() => {
        server = new Server(socketUrl);
        cy.stub(window, 'WebSocket').callsFake((url) => new WebSocket(url));
    });

    afterEach(() => {
        if (server) {
            server.stop();
            server = undefined;
        }
    });

    it('событие once должно срабатывать только один раз', (done) => {
        let messageCount = 0;
        let totalMessages = 0;

        server.on('connection', (socket) => {
            socket.send('test');
            socket.send('test');
        });
        const client = getClient(socketUrl);
        client.once('message', () => messageCount++);

        client.on('message', () => {
            totalMessages++;
            if (totalMessages === 2) {
                expect(messageCount).to.eq(1);
                done();
            }
        });
    });

    it('ответное сообщение не должно теряться при асинхронных нескольких запросах', (done) => {
        createServerPong(server);
        const client = getClient(socketUrl);
        client.sendText('200').then(() => {
            done();
        });
        client.sendText('100'); // посылаем сообщение, с задержкой обратного сообщения
    });

    it('messageId должен увеличиваться у последовательных сообщений', (done) => {
        createServerPong(server);
        const client = getClient(socketUrl);
        let messageId: number | undefined;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.sendText('100').then((res: any) => {
            messageId = res;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.sendText('150').then((res: any) => {
            expect(res - messageId).to.eq(1);
            done();
        });
    });

    it('внутри метода batch messageId у сообщений не увеличивается', (done) => {
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';

            let messageId: number;

            socket.on('message', (ev: Uint8Array) => {
                const message = Message.decode(ev);
                if (!message.initialSettings) {
                    if (!messageId) {
                        messageId = Number(message.messageId);
                        socket.send(createAnswerBuffer(message.messageId, message.last));
                    } else {
                        expect(messageId).to.eq(Number(message.messageId));
                        done();
                    }
                }
            });
        });

        const client = getClient(socketUrl);

        client.batch(({ sendText }) => {
            sendText('1', { last: -1 }).then(() => {
                sendText('1');
            });
        });
    });

    it('асинхронный batch не должен блокировать увеличение messageId у асинхронных сообщений', (done) => {
        server.on('connection', (socket) => {
            socket.binaryType = 'arraybuffer';

            let batchingMessageId: number;
            let sendMessageId: number;

            socket.on('message', (ev: Uint8Array) => {
                const message = Message.decode(ev);
                if (!message.initialSettings) {
                    if (message.text?.data === 'batch') {
                        if (!batchingMessageId) {
                            batchingMessageId = Number(message.messageId);
                        }
                        if (message.last === 1) {
                            expect(sendMessageId - batchingMessageId).to.eq(1);
                            done();
                            return;
                        }
                    }
                    if (message.text?.data === 'not batch') {
                        sendMessageId = Number(message.messageId);
                    }
                    socket.send(createAnswerBuffer(message.messageId, message.last));
                }
            });
        });

        const client = getClient(socketUrl);
        client.on('ready', () => {
            client.batch(({ sendText }) => {
                sendText('batch', { last: -1 })
                    .then(() => client.sendText('not batch'))
                    .then(() => {
                        sendText('batch', { last: 1 });
                    });
            });
        });
    });

    it('если внутри batch уже было отправленно последнее сообщение, то cooбщение с last=false вызовет ошибку', (done) => {
        createServerPong(server);
        const client = getClient(socketUrl);
        client.batch(({ sendText }) =>
            sendText('10', { last: 1 })
                .then(() => sendText('10'))
                .catch((e) => {
                    expect(e.message).to.equal("Can't send messages in batch after last message have been sent");
                    done();
                }),
        );
    });
    it('если внутри batch уже было отправленно последнее сообщение, то cooбщение с last=1 вызовет ошибку', (done) => {
        createServerPong(server);
        const client = getClient(socketUrl);
        client.batch(({ sendText }) =>
            sendText('10', { last: 1 })
                .then(() => sendText('10', { last: 1 }))
                .catch((e) => {
                    expect(e.message).to.equal("Can't send two last items in batch");
                    done();
                }),
        );
    });

    it('сообщения при закрытом сокете должны буферизироваться', (done) => {
        const client = getClient(socketUrl);
        const msgCount = 5;

        client.once('ready', () => {
            server.clients().forEach((c) => c.close());
            server.stop();

            client.once('close', () => {
                for (let i = 0; i < 5; i++) {
                    client.sendText(i === msgCount - 1 ? 'last' : 'test');
                }

                server = new Server(socketUrl);
                server.on('connection', (socket) => {
                    socket.binaryType = 'arraybuffer';
                    let receivedMessages = 0;

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    socket.on('message', (ev: any) => {
                        const message = Message.decode(ev);
                        if (!message.initialSettings) {
                            receivedMessages++;
                            if (message.text.data === 'last') {
                                expect(receivedMessages).to.eq(msgCount);
                                done();
                            }
                        }
                    });
                });
            });
        });
    });
});

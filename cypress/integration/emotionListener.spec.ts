/// <reference types="cypress" />

import { Server, WebSocket } from 'mock-socket';

import { convertMessageToBuffer, createSystemMessageBuffer, getClient } from '../support/helpers/clientMethods.helpers';
import { Message } from '../../src/proto';
import { MESSAGE_NAMES } from '../../src/client';
import { createNanoEvents } from '../../src/nanoevents';
import { EmotionEventsType } from '../../src/typings';
import { createVoicePlayerListener, bindEmotionListener } from '../../src/clientListeners';

const socketUrl = 'ws://test.com';

let server: undefined | Server;

const getClientAndOnEmotion = (socketUrl: string) => {
    const vpsClient = getClient(socketUrl);
    const { on: onEmotion, emit: emitEmotion } = createNanoEvents<EmotionEventsType>();

    // добавляем возможность прослушивания входящих голосовых сообщений
    const voicePlayer = createVoicePlayerListener(vpsClient, emitEmotion);

    // добавляем эмиттер для эмоций
    bindEmotionListener(vpsClient, emitEmotion);

    return { client: vpsClient, onEmotion, finishPlayback: voicePlayer.finishPlayback };
};

describe('Тестирование эмоций виртуального ассистента', () => {
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

    it('Должна приходить эмоция смеха на фразу "расскажи анекдот"', (done) => {
        const { client, onEmotion } = getClientAndOnEmotion(socketUrl);
        onEmotion('emotion', (emotion) => {
            expect(emotion.emotionId).to.equal('laugh');
            done();
        });
        server.on('connection', (socket) => {
            socket.on('message', (msg: Uint8Array) => {
                socket.binaryType = 'arraybuffer';
                const message = Message.decode(msg);
                if (!message.initialSettings) {
                    socket.send(
                        createSystemMessageBuffer(Number(message.messageId), { emotion: { emotionId: 'laugh' } }),
                    );
                }
            });
        });
        client.on('ready', () => {
            client.sendText('расскажи анекдот');
        });
    });

    it('При голосовом сообщении должы воспроизводиться эмоции начала и конца голосового сообщения', (done) => {
        const { client, onEmotion } = getClientAndOnEmotion(socketUrl);
        const status = { playStarted: false, playStoped: false };

        server.on('connection', (socket) => {
            socket.on('message', (msg: Uint8Array) => {
                const message = Message.decode(msg);
                if (!message.initialSettings) {
                    socket.send(
                        convertMessageToBuffer({
                            messageId: message.messageId,
                            messageName: MESSAGE_NAMES.ANSWER_TO_USER,
                            voice: { data: new Uint8Array(new Array(10000).fill(0)) },
                        }),
                    );
                }
            });
        });

        onEmotion('emotion', (emotion) => {
            status[emotion.voiceStatus] = true;
            if (emotion.voiceStatus === 'playStoped') {
                expect(status.playStarted).to.eq(true);
                done();
            }
        });
        client.on('ready', () => {
            client.sendText('расскажи анекдот');
        });
    });

    it('При вызове функции finishPlayback должно срабатывать событие playStoped', (done) => {
        let interval: number | undefined;
        const { client, onEmotion, finishPlayback } = getClientAndOnEmotion(socketUrl);
        const status = { playStarted: false, playStoped: false };

        server.on('connection', (socket) => {
            socket.on('message', (msg: Uint8Array) => {
                const message = Message.decode(msg);
                if (!message.initialSettings) {
                    interval = setInterval(() => {
                        socket.send(
                            convertMessageToBuffer({
                                messageId: message.messageId,
                                messageName: MESSAGE_NAMES.ANSWER_TO_USER,
                                voice: { data: new Uint8Array(new Array(10000).fill(0)) },
                            }),
                        );
                    }, 300);
                }
            });
        });

        onEmotion('emotion', (emotion) => {
            if (emotion.voiceStatus === 'playStarted' && !status.playStarted) {
                setTimeout(() => finishPlayback(), 300);
            }
            status[emotion.voiceStatus] = true;

            if (emotion.voiceStatus === 'playStoped') {
                clearInterval(interval);
                expect(status.playStarted).to.eq(true);
                done();
            }
        });
        client.on('ready', () => {
            client.sendText('начни говорить без остановки');
        });
    });
});

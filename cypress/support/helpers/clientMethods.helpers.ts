import { Server } from 'mock-socket';

import { appendHeader, createClient, MESSAGE_NAMES } from '../../../src/client';
import { Message } from '../../../src/proto';
import { legacyDevice, settings } from '../../../src/dev';
import { EventsType } from '../../../src/typings';

export const createAnswerBuffer = (messageId: number | Long, last?: number) => {
    const encodedAsNodeBuffer = appendHeader(
        Message.encode({
            messageId,
            last: last ?? 1,
            systemMessage: { data: messageId.toString() },
            messageName: MESSAGE_NAMES.ANSWER_TO_USER,
        }).finish(),
    );
    const newBuffer = new ArrayBuffer(encodedAsNodeBuffer.byteLength);
    const newBufferView = new Uint8Array(newBuffer);
    newBufferView.set(encodedAsNodeBuffer, 0);
    return newBuffer;
};

export const createServerPong = (server: Server) => {
    server.on('connection', (socket) => {
        socket.binaryType = 'arraybuffer';
        socket.on('message', (ev: Uint8Array) => {
            const message = Message.decode(ev);
            if (!message.initialSettings) {
                const delay = Number(message.text.data);
                setTimeout(() => {
                    socket.send(createAnswerBuffer(message.messageId, message.last));
                }, delay);
            }
        });
    });
};

export const getClient = (socketUrl: string) =>
    createClient({
        url: socketUrl,
        userId: '123',
        token: 'token',
        legacyDevice,
        settings,
        version: 3,
        userChannel: 'test',
    });

export const createOnPromise = (client: ReturnType<typeof getClient>, eventName: keyof EventsType) =>
    new Cypress.Promise((resolve) => {
        client.on(eventName, () => {
            resolve(eventName);
        });
    });

import { Server } from 'mock-socket';

import { appendHeader, createClient } from '../../../src/client';
import { Message } from '../../../src/proto';
import { EventsType, MessageNames } from '../../../src/typings';

const legacyDevice = {
    clientType: 'simple',
    channel: 'Android_SB',
    channelVersion: '8.1.0.2932_RC',
    platformName: 'WEBDBG 1.0',
    platformVersion: '1.0',
};
const settings = {
    dubbing: 1,
    echo: -1,
};

export const createAnswerBuffer = ({
    messageId = 1,
    last = 1,
    systemMessageData,
}: {
    messageId?: number | Long;
    last?: number;
    systemMessageData?: string;
}) => {
    const encodedAsNodeBuffer = appendHeader(
        Message.encode({
            messageId,
            last: last ?? 1,
            systemMessage: systemMessageData ? { data: systemMessageData } : { data: messageId.toString() },
            messageName: MessageNames.ANSWER_TO_USER,
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
                    socket.send(createAnswerBuffer({ messageId: message.messageId, last: message.last }));
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

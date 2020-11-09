import { Message } from '../../../src/proto';
import { SystemMessageDataType } from '../../../src/typings';

export const appendHeader = (buffer: Uint8Array) => {
    // Добавляем 4 байта в начало с длинной сообщения
    const arrayBuffer = new ArrayBuffer(4);
    const dataView = new DataView(arrayBuffer, 0);
    dataView.setInt32(0, buffer.length, true);
    const uint8Array = new Uint8Array(4 + buffer.length);
    uint8Array.set(new Uint8Array(arrayBuffer));
    uint8Array.set(buffer, 4);

    return uint8Array;
};

export const initProtocol = (socket: any) => {
    socket.on('message', (data: Uint8Array) => {
        const message = Message.decode(data.slice(4));
        if (message.messageName === 'OPEN_ASSISTANT') {
            sendMessage(socket, message.messageId, {
                app_info: {
                    applicationId: '',
                    appversionId: '',
                    frontendEndpoint: '',
                    frontendType: '',
                    projectId: '',
                },
                items: [],
            });
        }
    });
};

export const sendMessage = (socket: any, messageId: number | Long, systemMessageData: SystemMessageDataType) => {
    const message = Message.create({
        messageName: 'ANSWER_TO_USER',
        messageId,
        systemMessage: { data: JSON.stringify(systemMessageData) },
        last: 1,
        version: 3,
    });

    const buffer = Message.encode(message).finish();
    const bufferWithHeader = appendHeader(buffer);

    socket.dispatchEvent({
        type: 'message',
        data: bufferWithHeader,
    });
};

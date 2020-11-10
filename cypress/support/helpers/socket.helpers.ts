import { Message } from '../../../src/proto';
import { appendHeader } from '../../../src/client';
import { SystemMessageDataType } from '../../../src/typings';

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

export const initProtocol = (socket: any) => {
    socket.on('message', (data: Uint8Array) => {
        const message = Message.decode(data.slice(4));
        if (message.messageName === 'OPEN_ASSISTANT') {
            sendMessage(socket, message.messageId, {
                // eslint-disable-next-line @typescript-eslint/camelcase
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

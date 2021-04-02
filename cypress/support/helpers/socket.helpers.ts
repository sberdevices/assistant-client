import { Message } from '../../../src/proto';
import { appendHeader } from '../../../src/client';
import {
    AssistantCharacter,
    AssistantNavigationCommand,
    AssistantSmartAppCommand,
    SystemMessageDataType,
    MessageNames,
} from '../../../src/typings';

export const APP_INFO = {
    applicationId: 'test_app',
    appversionId: '0.0.0',
    frontendEndpoint: 'https://test.test',
    frontendType: 'test_front',
    projectId: 'test_project',
};

export const sendMessage = (
    socket: any,
    messageId: number | Long,
    { systemMessageData, textData }: { systemMessageData?: SystemMessageDataType; textData?: string },
) => {
    const message = Message.create({
        messageName: MessageNames.ANSWER_TO_USER,
        messageId,
        text: textData ? { data: textData } : undefined,
        systemMessage: systemMessageData != null ? { data: JSON.stringify(systemMessageData) } : undefined,
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

export const initProtocol = (
    socket: any,
    {
        initPhrase,
        character = AssistantCharacter.SBER,
        items = [],
    }: {
        initPhrase?: string;
        character?: AssistantCharacter;
        items?: Array<{ command: AssistantSmartAppCommand | AssistantNavigationCommand }>;
    } = {},
) => {
    socket.on('message', (data: Uint8Array) => {
        const message = Message.decode(data.slice(4));
        if (message.messageName === 'OPEN_ASSISTANT') {
            sendMessage(socket, message.messageId, {
                systemMessageData: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    app_info: {
                        applicationId: '',
                        appversionId: '',
                        frontendEndpoint: '',
                        frontendType: '',
                        projectId: '',
                    },
                    items: [],
                },
            });
        }
        if (initPhrase && message.text?.data === initPhrase) {
            sendMessage(socket, message.messageId, {
                systemMessageData: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    app_info: APP_INFO,
                    character: { id: character },
                    items,
                },
            });
        }
    });
};

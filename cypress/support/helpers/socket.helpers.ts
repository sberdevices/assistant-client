import { Message } from '../../../src/proto';
import { appendHeader } from '../../../src/client';
import {
    AssistantNavigationCommand,
    AssistantSmartAppCommand,
    SystemMessageDataType,
    MessageNames,
    AppInfo,
    Character,
} from '../../../src/typings';

export const APP_INFO: AppInfo = {
    applicationId: 'test_app',
    appversionId: '0.0.0',
    frontendEndpoint: 'https://test.test',
    frontendType: 'WEB_APP',
    projectId: 'test_project',
};

export interface Socket {
    dispatchEvent: (e: { type: string; data: Uint8Array }) => void;
    on: (event: 'message', cb: (data: Uint8Array) => void) => void;
}

export const sendMessage = (
    socket: Socket,
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
    socket: Socket,
    {
        initPhrase,
        character = { id: 'sber', name: 'Сбер', gender: 'male', appeal: 'official' },
        items = [],
    }: {
        initPhrase?: string;
        character?: Character;
        items?: Array<{ command: AssistantSmartAppCommand | AssistantNavigationCommand }>;
    } = {},
) => {
    socket.on('message', (data: Uint8Array) => {
        const message = Message.decode(data.slice(4));
        if (message.messageName === 'OPEN_ASSISTANT') {
            sendMessage(socket, message.messageId, {
                systemMessageData: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    auto_listening: false,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    app_info: {
                        applicationId: '',
                        appversionId: '',
                        frontendEndpoint: '',
                        frontendType: 'WEB_APP',
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
                    auto_listening: false,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    app_info: APP_INFO,
                    character,
                    items,
                },
            });
        }
    });
};

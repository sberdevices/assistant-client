import { WebSocket } from 'mock-socket';

import { appendHeader } from '../../../src/assistantSdk/client/protocol';
import { IStatus, Message } from '../../../src/proto';
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
    frontendType: 'WEB_APP',
    projectId: 'test_project',
    frontendStateId: 'test_app',
};

export const sendMessage = (
    socket: WebSocket,
    messageId: number | Long,
    {
        systemMessageData,
        textData,
        statusData,
    }: { systemMessageData?: SystemMessageDataType; textData?: string; statusData?: IStatus },
    { messageName = MessageNames.ANSWER_TO_USER }: { messageName?: string } = {},
) => {
    const message = Message.create({
        messageName,
        messageId,
        text: textData ? { data: textData } : undefined,
        systemMessage: systemMessageData != null ? { data: JSON.stringify(systemMessageData) } : undefined,
        status: statusData,
        last: 1,
        version: 5,
    });

    const buffer = Message.encode(message).finish();
    const bufferWithHeader = appendHeader(buffer);

    socket.dispatchEvent({
        type: 'message',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        data: bufferWithHeader,
    });
};

export const initProtocol = (
    socket: WebSocket,
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
    socket.on('message', (data) => {
        const message = Message.decode((data as Uint8Array).slice(4));
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

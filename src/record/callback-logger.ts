import { Message } from '../proto';
import { ClientLogger, CreateClientDataType } from '../typings';

import { RecorderCallback } from './callback-recorder';

export const createCallbackLogger: (cb: RecorderCallback) => ClientLogger = (cb) => ({
    logInit: (message: CreateClientDataType) => {
        cb({ type: 'params', parameters: message });
    },

    logIncoming: (message: Message) => {
        cb({ type: 'incoming', message });
    },

    logOutcoming: (message: Message) => {
        cb({ type: 'outcoming', message });
    },
});

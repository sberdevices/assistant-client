import { Message } from '../proto';
import { ClientLogger, VpsConfiguration } from '../typings';

import { RecorderCallback } from './callback-recorder';

export const createCallbackLogger: (cb: RecorderCallback) => ClientLogger = (cb) => ({
    logInit: (message: VpsConfiguration) => {
        cb({ type: 'params', parameters: message });
    },

    logIncoming: (message: Message) => {
        cb({ type: 'incoming', message });
    },

    logOutcoming: (message: Message) => {
        cb({ type: 'outcoming', message });
    },
});

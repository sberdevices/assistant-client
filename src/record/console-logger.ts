/* eslint-disable no-console */
import { Message } from '../proto';
import { ClientLogger, VpsConfiguration } from '../typings';

export const createConsoleLogger: (level?: 'debug' | 'log') => ClientLogger = (level = 'debug') => ({
    logInit: (message: VpsConfiguration) => {
        console[level]('Initialize', message);
    },

    logIncoming: (message: Message) => {
        console[level]('Received message', message);
    },

    logOutcoming: (message: Message) => {
        console[level]('Sended message', message);
    },
});

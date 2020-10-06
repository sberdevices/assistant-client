/* eslint-disable no-console */
import { Message } from '../proto';
import { ClientLogger, CreateClientDataType } from '../typings';

export const createConsoleLogger: (level?: 'debug' | 'log') => ClientLogger = (level = 'debug') => ({
    logInit: (message: CreateClientDataType) => {
        console[level]('Initialize', message);
    },

    logIncoming: (message: Message) => {
        console[level]('Received message', message);
    },

    logOutcoming: (message: Message) => {
        console[level]('Sended message', message);
    },
});

/* eslint-disable no-console */
import { Message } from '../proto';
import { ClientLogger } from '../typings';

export type ConsoleLoggerCreator = (level?: 'debug' | 'log') => ClientLogger;

export const createConsoleLogger: ConsoleLoggerCreator = (level = 'debug') => ({
    logInit: (message) => {
        console[level]('Initialize', message);
    },

    logIncoming: (message: Message) => {
        console[level]('Received message', message);
    },

    logOutcoming: (message: Message) => {
        console[level]('Sended message', message);
    },
});

/* eslint-disable no-console */
import { ClientLogger } from '../typings';

export type ConsoleLoggerCreator = (level?: 'debug' | 'log') => ClientLogger;

export const createConsoleLogger: ConsoleLoggerCreator = (level = 'debug') => (entry) => {
    switch (entry.type) {
        case 'init': {
            console[level]('Initialize', entry.params);

            break;
        }
        case 'incoming': {
            console[level]('Received message', entry.message);

            break;
        }
        case 'outcoming': {
            console[level]('Sended message', entry.message);

            break;
        }
        default: {
            break;
        }
    }
};

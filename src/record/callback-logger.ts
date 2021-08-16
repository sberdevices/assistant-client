import { Message } from '../proto';
import { ClientLogger, ClientLoggerLogInitEntry } from '../typings';

import { Recorder, RecorderEntry, RecorderHandler } from './recorder';

export interface IncomingLogEntry extends RecorderEntry {
    type: 'incoming';
    message: Message;
}

export interface OutcomingLogEntry extends RecorderEntry {
    type: 'outcoming';
    message: Message;
}

export interface ParametersLogEntry extends RecorderEntry {
    type: 'params';
    parameters: ClientLoggerLogInitEntry;
}

export type CallbackLoggerEntryRecorder<
    R extends object = {},
    M extends CallbackLoggerEntry = CallbackLoggerEntry
> = Recorder<R, M>;
export interface CallbackLoggerRecorderCreator<
    R extends object = {},
    M extends CallbackLoggerEntry = CallbackLoggerEntry
> {
    (defaultActive?: boolean): CallbackLoggerEntryRecorder<R, M>;
}

export type CallbackLoggerEntry = IncomingLogEntry | OutcomingLogEntry | ParametersLogEntry;
export type CallbackLoggerHandler = RecorderHandler<CallbackLoggerEntry>;
export type CallbackLoggerCreator = (cb: CallbackLoggerHandler) => ClientLogger;

export const createCallbackLogger: CallbackLoggerCreator = (cb) => ({
    logInit: (parameters) => {
        cb({ type: 'params', parameters });
    },

    logIncoming: (message: Message) => {
        cb({ type: 'incoming', message });
    },

    logOutcoming: (message: Message) => {
        cb({ type: 'outcoming', message });
    },
});

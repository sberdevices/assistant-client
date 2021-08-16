import { AssistantRecord } from '../typings';

import { createBaseRecorder, Recorder } from './recorder';
import { CallbackLoggerEntry, CallbackLoggerHandler, CallbackLoggerRecorderCreator } from './callback-logger';

export type LogCallbackRecorderRecordGetter = () => AssistantRecord;
export interface LogCallbackRecorder extends Recorder<AssistantRecord, CallbackLoggerEntry> {
    handler: CallbackLoggerHandler;
    getRecord: LogCallbackRecorderRecordGetter;
    start: () => void;
    stop: () => void;
}

const CURRENT_VERSION = '0.1.0';

const getDefaultRecord = (): AssistantRecord => ({ entries: [], version: CURRENT_VERSION });

export interface LogCallbackRecorderCreator extends CallbackLoggerRecorderCreator<AssistantRecord> {
    (defaultActive: boolean): LogCallbackRecorder;
}
export const createLogCallbackRecorder: LogCallbackRecorderCreator = (defaultActive = true) => {
    const { stop, start, updateRecord, getRecord, prepareHandler } = createBaseRecorder<
        AssistantRecord,
        CallbackLoggerEntry
    >(defaultActive, getDefaultRecord);

    const handler = prepareHandler((entry) => {
        switch (entry.type) {
            case 'incoming':
                updateRecord((record) => {
                    if (entry.message.systemMessage?.data) {
                        record.entries.push({
                            type: entry.type,
                            message: {
                                data: JSON.parse(entry.message.systemMessage.data),
                                name: entry.message.messageName,
                            },
                        });
                    }
                });

                updateRecord((record) => {
                    if (entry.message.text) {
                        record.entries.push({ type: entry.type, text: entry.message.text });
                    }
                });

                break;
            case 'outcoming':
                updateRecord((record) => {
                    if (entry.message.systemMessage?.data) {
                        record.entries.push({
                            type: entry.type,
                            message: {
                                data: JSON.parse(entry.message.systemMessage.data),
                                name: entry.message.messageName,
                            },
                        });
                    }
                });

                updateRecord((record) => {
                    if (entry.message.text) {
                        record.entries.push({ type: entry.type, text: entry.message.text });
                    }
                });

                break;
            default:
                updateRecord((record) => {
                    record.parameters = entry.parameters;
                });

                break;
        }
    });

    return {
        handler,
        getRecord,
        start,
        stop,
    };
};

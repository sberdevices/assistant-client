import { AssistantRecord, ClientLogger } from '../typings';

import { createBaseRecorder, Recorder } from './recorder';

export type LogCallbackRecorderRecordGetter = () => AssistantRecord;
export interface LogCallbackRecorder extends Recorder<AssistantRecord> {
    handler: ClientLogger;
    getRecord: LogCallbackRecorderRecordGetter;
    start: () => void;
    stop: () => void;
}

const CURRENT_VERSION = '0.1.0';

const getDefaultRecord = (): AssistantRecord => ({ entries: [], version: CURRENT_VERSION });

export type LogCallbackRecorderCreator = (defaultActive: boolean) => LogCallbackRecorder;
export const createLogCallbackRecorder: LogCallbackRecorderCreator = (defaultActive = true) => {
    const { stop, start, updateRecord, getRecord, prepareHandler } = createBaseRecorder<AssistantRecord>(
        defaultActive,
        getDefaultRecord,
    );

    const handler = prepareHandler((entry) => {
        switch (entry.type) {
            case 'incoming':
                updateRecord((record) => {
                    // ифак внутри функции для того чтобы TS не волновался
                    // если написать снаружи вызова, то он не увидит эту проверку
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
                    record.parameters = entry.params;
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

import { Message } from '../proto';
import { AssistantRecord, VpsConfiguration, LogRecorder } from '../typings';

export interface IncomingLogEntry {
    type: 'incoming';
    message: Message;
}

export interface OutcomingLogEntry {
    type: 'outcoming';
    message: Message;
}

export interface ParametersLogEntry {
    type: 'params';
    parameters: VpsConfiguration;
}

export type RecorderCallback = (message: IncomingLogEntry | OutcomingLogEntry | ParametersLogEntry) => void;

const CURRENT_VERSION = '0.1.0';

const getDefaultLog = () => ({ entries: [], version: CURRENT_VERSION });

export const createLogCallbackRecorder = (
    subscribe: (cb: RecorderCallback) => void,
    defaultActive = true,
): LogRecorder => {
    let isActive = defaultActive;
    let currentLog: AssistantRecord = getDefaultLog();

    subscribe((entry: IncomingLogEntry | OutcomingLogEntry | ParametersLogEntry) => {
        if (isActive === false) {
            return;
        }

        switch (entry.type) {
            case 'incoming':
                if (entry.message.systemMessage?.data) {
                    currentLog.entries.push({
                        type: entry.type,
                        message: {
                            data: JSON.parse(entry.message.systemMessage.data),
                            name: entry.message.messageName,
                        },
                    });
                }

                if (entry.message.text) {
                    currentLog.entries.push({ type: entry.type, text: entry.message.text });
                }
                break;
            case 'outcoming':
                if (entry.message.systemMessage?.data) {
                    currentLog.entries.push({
                        type: entry.type,
                        message: {
                            data: JSON.parse(entry.message.systemMessage.data),
                            name: entry.message.messageName,
                        },
                    });
                }

                if (entry.message.text) {
                    currentLog.entries.push({ type: entry.type, text: entry.message.text });
                }
                break;
            default:
                currentLog.parameters = entry.parameters;
                break;
        }
    });

    const getRecord = (): AssistantRecord => currentLog;
    const start = () => {
        currentLog = getDefaultLog();
        isActive = true;
    };
    const stop = () => {
        isActive = false;
    };

    return {
        getRecord,
        start,
        stop,
    };
};

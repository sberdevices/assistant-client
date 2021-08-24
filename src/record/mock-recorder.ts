import cloneDeep from 'lodash.clonedeep';

import { ClientLogger, SystemMessageDataType } from '../typings';
import { Message, SystemMessage } from '../proto';

import { createBaseRecorder, Recorder } from './recorder';

export interface MockRecorderRecord {
    midToRequestKey: Record<string, string | undefined>;
    requestKeyToMessages: Record<string, Message[] | undefined>;
}

type MockRecorderRecordGetter = () => MockRecorderRecord;
interface MockRecorder extends Recorder<MockRecorderRecord> {
    handler: ClientLogger;
    getRecord: MockRecorderRecordGetter;
    start: () => void;
    stop: () => void;
}

const getDefaultRecord = (): MockRecorderRecord => ({
    midToRequestKey: {},
    requestKeyToMessages: {},
});

export type MockRecorderCreator = (defaultActive?: boolean) => MockRecorder;

const getMid = (message: Message) => String(message.messageId);

const getRequestKey = (message: Message) => {
    if (message.messageName === 'OPEN_ASSISTANT') {
        return message.messageName;
    }

    if (message.text && message.text.data) {
        return message.text.data;
    }

    if (message.initialSettings) {
        return `settings.device=${message.initialSettings.device?.surface}`;
    }

    const data = message.systemMessage?.data;

    if (typeof data === 'string') {
        const systemMessageData: SystemMessageDataType = JSON.parse(data);

        if (systemMessageData.server_action) {
            return JSON.stringify(systemMessageData.server_action);
        }
    }

    // eslint-disable-next-line no-console
    console.error('Не получается определить requestKey для запроса', message);

    return undefined;
};

const normalizeMessage = (message: Message) => {
    if (!message.systemMessage) {
        return message;
    }

    if (typeof message.systemMessage.data === 'string') {
        message.systemMessage.data = JSON.parse(message.systemMessage.data);
    }

    return message;
};

const serializeMessage = (message: Message) => {
    if (message.systemMessage) {
        message.systemMessage = SystemMessage.create({
            data: JSON.stringify(message.systemMessage.data),
        });
    }

    return message;
};

export const createAnswerFromMockByMessageGetter = (record: MockRecorderRecord) => (message: Message) => {
    const requestKey = getRequestKey(message);

    if (!requestKey) {
        return undefined;
    }

    const messagesFromMock = record.requestKeyToMessages[requestKey];

    if (!messagesFromMock) {
        return undefined;
    }

    return messagesFromMock.map((messageFromMock) => serializeMessage(cloneDeep(messageFromMock)));
};

export const createMockRecorder: MockRecorderCreator = (defaultActive = true) => {
    const { prepareHandler, start, stop, getRecord: baseGetRecord, updateRecord } = createBaseRecorder<
        MockRecorderRecord
    >(defaultActive, getDefaultRecord);

    const getRecord = (): MockRecorderRecord => {
        const baseRecord = baseGetRecord();

        // сортировка нужна для того чтобы при сохранении мока и добавлении нового
        // был красивый дифф и было понятно что именно добавили
        const requestKeyToMessages = Object.keys(baseRecord.requestKeyToMessages)
            .sort()
            .reduce<MockRecorderRecord['requestKeyToMessages']>((result, key) => {
                const value = baseRecord.requestKeyToMessages[key];

                result[key] = value;

                return result;
            }, {});

        return {
            midToRequestKey: baseRecord.midToRequestKey,
            requestKeyToMessages,
        };
    };

    const handler = prepareHandler((entry) => {
        switch (entry.type) {
            case 'outcoming': {
                const message = cloneDeep(entry.message);
                const mid = getMid(message);
                const requestKey = getRequestKey(message);

                if (!requestKey) {
                    // eslint-disable-next-line no-console
                    console.error('Не удалось вычислить requestKey для сообщения:', message);

                    return;
                }

                // eslint-disable-next-line no-console
                console.log(`recorder outcoming message with id: ${mid} to requestKey: ${requestKey}`);

                updateRecord((record) => {
                    record.midToRequestKey[mid] = requestKey;
                    record.requestKeyToMessages[requestKey] = [];
                });

                break;
            }

            case 'incoming': {
                updateRecord((record) => {
                    // скипаем tts, там тяжеловестные бинарные данные от которых мало толка ;)
                    if (entry.message.messageName === 'TTS') {
                        return;
                    }

                    const message: Message = cloneDeep(entry.message);
                    const mid = getMid(message);
                    const requestKey = record.midToRequestKey[mid];

                    if (!requestKey) {
                        // eslint-disable-next-line no-console
                        console.error(`Не удалось получить requestKey по mid=${mid}`);

                        return;
                    }

                    const normalizedMessage = normalizeMessage(message);

                    // eslint-disable-next-line no-console
                    console.log(`recorder incoming message with id: ${mid} and requestKey: ${requestKey}`);

                    const messagesFromMock = record.requestKeyToMessages[requestKey];

                    if (messagesFromMock) {
                        messagesFromMock.push(normalizedMessage);
                    } else {
                        record.requestKeyToMessages[requestKey] = [normalizedMessage];
                    }

                    // eslint-disable-next-line no-console
                    console.log('message', normalizedMessage);
                });

                break;
            }

            default: {
                break;
            }
        }
    });

    return {
        start,
        stop,
        getRecord,
        handler,
    };
};

import { appendHeader } from '../assistantSdk/client/protocol';
import { createNanoEvents } from '../nanoevents';
import { Message } from '../proto';
import { WSCreator } from '../typings';

import { createAnswerFromMockByMessageGetter, MockRecorderRecord } from './mock-recorder';

export const createMockWSCreator = (recordMock: MockRecorderRecord, timeout = 1000): WSCreator => (url) => {
    const getAnswerFromMockByMessage = createAnswerFromMockByMessageGetter(recordMock);
    const { on, emit } = createNanoEvents();

    const send: WebSocket['send'] = (dataToSend) => {
        if (!(dataToSend instanceof Uint8Array)) {
            // eslint-disable-next-line no-console
            console.error(new Error('Неверный тип данных на входе ws.send()'));

            return;
        }

        const messageToSend = Message.decode(new Uint8Array(dataToSend).slice(4));
        const responseMessageList = getAnswerFromMockByMessage(messageToSend);

        if (!responseMessageList) {
            // eslint-disable-next-line no-console
            console.error('Не удалось получить ответ для сообщения: ', messageToSend);

            return;
        }

        if (responseMessageList.length === 0) {
            // eslint-disable-next-line no-console
            console.error('Пустой ответ для сообщения: ', messageToSend);

            return;
        }

        responseMessageList.forEach((responseMessageFromMock) => {
            // это нужно для того чтобы client нормально прожевал ответ
            // типа, ушло сообщение с mid=5 и вернуться тоже должно с mid=5
            responseMessageFromMock.messageId = messageToSend.messageId;

            const buffer = Message.encode(responseMessageFromMock).finish();
            const data = appendHeader(buffer);

            // setTimeout для того, чтобы ответить не в этом стэке js'а
            // для того чтобы поведение было приближено к реальному
            setTimeout(() => emit('message', { data }), timeout);
        });
    };

    setTimeout(() => emit('open'));

    const notImplementedCallback = () => {
        throw new Error('not implemented');
    };

    return {
        send,
        url,
        // эти заглушки нужны чтобы поддержать api WebSocket, чтобы и типы
        // лишний раз не костылять и подложить соломки, если что)
        close: notImplementedCallback,
        onclose: notImplementedCallback,
        onerror: notImplementedCallback,
        onmessage: notImplementedCallback,
        onopen: notImplementedCallback,
        dispatchEvent: notImplementedCallback,
        removeEventListener: notImplementedCallback,
        CLOSED: 0,
        CLOSING: 0,
        CONNECTING: 0,
        OPEN: 0,
        protocol: '',
        extensions: '',
        bufferedAmount: 0,
        addEventListener: on,
        readyState: 1,
        binaryType: 'arraybuffer',
    };
};

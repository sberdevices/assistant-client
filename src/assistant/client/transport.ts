import { createNanoEvents } from '../../nanoevents';
import { Message } from '../../proto';

export const appendHeader = (buffer: Uint8Array) => {
    // Добавляем 4 байта в начало с длинной сообщения
    const arrayBuffer = new ArrayBuffer(4);
    const dataView = new DataView(arrayBuffer, 0);
    dataView.setInt32(0, buffer.length, true);
    const uint8Array = new Uint8Array(4 + buffer.length);
    uint8Array.set(new Uint8Array(arrayBuffer));
    uint8Array.set(buffer, 4);

    return uint8Array;
};

export interface TransportEvents {
    connecting: () => void;
    ready: () => void;
    close: () => void;
    error: (error: Event) => void;
    message: (message: Message) => void;
}

export const createTransport = () => {
    const { on, emit } = createNanoEvents<TransportEvents>();

    let status: 'connecting' | 'ready' | 'closed' = 'closed';
    let stopped = false;
    let ws: WebSocket;
    let timeOut: number | undefined; // ид таймера автореконнекта
    let retries = 0; // количество попыток коннекта при ошибке

    const stop = () => {
        stopped = true;
        ws && ws.close(); // статус изменится по подписке
        clearTimeout(timeOut);
        timeOut = undefined;
    };

    const send = (message: Message) => {
        const buffer = Message.encode(message).finish();
        const bufferWithHeader = appendHeader(buffer);

        ws.send(bufferWithHeader);
    };

    const start = (vpsUrl: string) => {
        if (status !== 'closed') {
            return;
        }

        status = 'connecting';
        emit('connecting');
        // TODO: нужен таймаут для подключения
        ws = new WebSocket(vpsUrl);

        ws.binaryType = 'arraybuffer';
        ws.addEventListener('open', () => {
            if (ws.readyState === 1) {
                retries = 0; // сбрасываем количество попыток реконнекта
                status = 'ready';
                emit('ready');
            }
        });

        ws.addEventListener('close', () => {
            status = 'closed';
            emit('close');
        });

        ws.addEventListener('error', (e) => {
            if (status !== 'connecting') {
                throw e;
            }

            // пробуем переподключаться, если возникла ошибка при коннекте
            if (!ws || (ws.readyState === 3 && !stopped)) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                if (retries < 3) {
                    timeOut = window.setTimeout(() => {
                        start(vpsUrl);
                        retries++;
                    }, 300 * retries);
                } else {
                    retries = 0;
                    emit('error', e);
                }
            }
        });

        ws.addEventListener('message', (e) => {
            emit('message', Message.decode(new Uint8Array(e.data).slice(4)));
        });
    };

    return {
        send,
        start,
        stop,
        on,
        get status() {
            return status;
        },
    };
};

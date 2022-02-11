import { createNanoEvents } from '../../nanoevents';
import { WSCreator } from '../../typings';

export interface TransportEvents {
    connecting: () => void;
    ready: () => void;
    close: () => void;
    error: (error?: Event) => void;
    message: (data: Uint8Array) => void;
}

const defaultWSCreator: WSCreator = (url: string) => new WebSocket(url);

export const createTransport = (createWS: WSCreator = defaultWSCreator) => {
    const { on, emit } = createNanoEvents<TransportEvents>();

    let status: 'connecting' | 'ready' | 'closed' = 'closed';
    let stopped = false;
    let ws: WebSocket | undefined;
    let timeOut: number | undefined; // ид таймера автореконнекта
    let retries = 0; // количество попыток коннекта при ошибке

    const handleWsClose = () => {
        status = 'closed';
        emit('close');
    };

    const close = () => {
        // ничего не делаем, если уже закрыто
        if (ws && ws.readyState === 3) {
            return;
        }

        stopped = true;
        ws && ws.removeEventListener('close', handleWsClose);
        ws && ws.close(); // статус изменится по подписке
        handleWsClose();
        ws = undefined;

        clearTimeout(timeOut);
        timeOut = undefined;
    };

    const send = (data: Uint8Array) => {
        if (!navigator.onLine) {
            close();
            emit('error');
            return;
        }

        ws && ws.send(data);
    };

    const open = (url: string) => {
        if (status !== 'closed') {
            return;
        }

        status = 'connecting';
        emit('connecting');
        // TODO: нужен таймаут для подключения
        ws = createWS(url);

        ws.binaryType = 'arraybuffer';
        ws.addEventListener('open', () => {
            if (ws && ws.readyState === 1) {
                retries = 0; // сбрасываем количество попыток реконнекта
                status = 'ready';
                emit('ready');
            }
        });

        ws.addEventListener('close', handleWsClose);

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
                        open(url);
                        retries++;
                    }, 300 * retries);
                } else {
                    retries = 0;
                    emit('error', e);
                }
            }
        });

        ws.addEventListener('message', (e) => {
            emit('message', e.data);
        });
    };

    const reconnect = (url: string) => {
        if (status === 'closed') {
            open(url);
            return;
        }

        close();
        setTimeout(() => reconnect(url));
    };

    return {
        send,
        open,
        close,
        reconnect,
        on,
    };
};

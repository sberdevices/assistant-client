import { createNanoEvents } from '../../../nanoevents';
import { VoicePlayerSettings } from '../../../typings';

import { createTrackStream } from './trackStream';

const createAudioContext = (options?: AudioContextOptions): AudioContext => {
    if (window.AudioContext) {
        return new AudioContext(options);
    }

    if (window.webkitAudioContext) {
        // eslint-disable-next-line new-cap
        return new window.webkitAudioContext();
    }

    throw new Error('Audio not supported');
};

const isAudioSupported = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);

/** Создает коллекцию треков  */
const createTrackQueue = <T extends unknown>() => {
    let trackIds: Array<string>;
    let trackMap: Map<string, T>;

    const clear = () => {
        trackIds = new Array<string>();
        trackMap = new Map<string, T>();
    };

    const push = (id: string, track: T) => {
        if (trackMap.has(id)) {
            throw new Error('Track already exists');
        }

        trackMap.set(id, track);
        trackIds.push(id);
    };

    const has = (id: string) => trackMap.has(id);

    const getById = (id: string): T => {
        const track = trackMap.get(id);
        if (track === undefined) {
            throw new Error('Unknown track id');
        }

        return track;
    };

    const getByIndex = (index: number): T => {
        if (index < 0 || index >= trackIds.length) {
            throw new Error('Index out of bounds');
        }

        const track = trackMap.get(trackIds[index]);
        if (track == null) {
            throw new Error('Something wrong...');
        }

        return track;
    };

    const some = (predicate: (item: T) => boolean) => trackIds.some((id) => predicate(getById(id)));

    clear();

    return {
        clear,
        has,
        get: getById,
        getByIndex,
        push,
        some,
        get length() {
            return trackIds.length;
        },
    };
};

export type EventsType = {
    play: (trackId: string) => void;
    end: (trackId: string) => void;
};

export const createVoicePlayer = ({
    startVoiceDelay = 0.2,
    sampleRate,
    numberOfChannels,
}: VoicePlayerSettings = {}) => {
    const actx: AudioContext | null = isAudioSupported ? createAudioContext() : null;
    const { on, emit } = createNanoEvents<EventsType>();
    const tracks = createTrackQueue<ReturnType<typeof createTrackStream>>();
    // true - воспроизводим все треки в очереди (новые в том числе), false - скипаем всю очередь (новые в т.ч.)
    let active = true;
    let cursor = 0;

    // если safari - нужно активировать аудиоконтекст по событию ввода
    if (actx && navigator.vendor.search('Apple') >= 0) {
        const handleClick = () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchstart', handleClick);

            /// нужно что-то проиграть, чтобы сафари разрешил воспроизводить звуки в любой момент в этом контексте
            /// проигрываем тишину
            const oscillator = actx.createOscillator();
            oscillator.frequency.value = 0;
            oscillator.connect(actx.destination);
            oscillator.start(0);
            oscillator.stop(0.5);
        };

        // для пк
        document.addEventListener('click', handleClick);
        // для мобильных устройств
        document.addEventListener('touchstart', handleClick);
    }

    const play = () => {
        if (cursor >= tracks.length) {
            if (tracks.some((track) => !track.loaded)) {
                return;
            }

            cursor = 0;
            tracks.clear();
            return;
        }

        const current = tracks.getByIndex(cursor);
        if (current.status === 'end') {
            if (cursor < tracks.length) {
                cursor++;
                play();
            }
        } else {
            current.play();
        }
    };

    const append = (data: Uint8Array, trackId: string, last = false) => {
        let current = tracks.has(trackId) ? tracks.get(trackId) : undefined;
        if (current == null) {
            if (actx == null) {
                // считаем что аудио неподдерживается, игнорируем вызов
                return;
            }
            current = createTrackStream(actx, {
                sampleRate,
                numberOfChannels,
                delay: startVoiceDelay,
                onPlay: () => emit('play', trackId),
                onEnd: () => {
                    emit('end', trackId);
                    play();
                },
                trackStatus: active ? 'stop' : 'end',
            });
            tracks.push(trackId, current);
        }

        if (current.status !== 'end' && data.length) {
            current.write(data);
        }

        if (last) {
            current.setLoaded();
        }

        play();
    };

    const stop = () => {
        while (cursor < tracks.length) {
            const cur = cursor;

            cursor++;
            tracks.getByIndex(cur).stop();
        }
    };

    return {
        append,
        get active() {
            return active;
        },
        set active(value: boolean) {
            active = value;
            if (value) {
                play();
            } else {
                stop();
            }
        },
        on,
        stop,
    };
};

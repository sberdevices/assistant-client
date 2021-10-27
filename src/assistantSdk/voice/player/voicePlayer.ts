import { createNanoEvents } from '../../../nanoevents';

import { createTrackStream } from './trackStream';

export interface VoicePlayerSettings {
    startVoiceDelay?: number;
    sampleRate?: number;
    numberOfChannels?: number;
}

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

export const createVoicePlayer = (
    actx: AudioContext,
    { startVoiceDelay = 0.2, sampleRate, numberOfChannels }: VoicePlayerSettings = {},
) => {
    const { on, emit } = createNanoEvents<EventsType>();
    const tracks = createTrackQueue<ReturnType<typeof createTrackStream>>();
    // true - воспроизводим все треки в очереди (новые в том числе), false - скипаем всю очередь (новые в т.ч.)
    let active = true;
    let cursor = 0;

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
        setActive(value: boolean) {
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

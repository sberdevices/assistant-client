import { createNanoEvents } from '../../../nanoevents';

import { createTrackCollection } from './trackCollection';
import { createTrackStream } from './trackStream';

export interface VoicePlayerSettings {
    startVoiceDelay?: number;
    sampleRate?: number;
    numberOfChannels?: number;
}

export type EventsType = {
    play: (trackId: string) => void;
    end: (trackId: string) => void;
};

export const createVoicePlayer = (
    actx: AudioContext,
    { startVoiceDelay = 0.2, sampleRate, numberOfChannels }: VoicePlayerSettings = {},
) => {
    const { on, emit } = createNanoEvents<EventsType>();
    const tracks = createTrackCollection<ReturnType<typeof createTrackStream>>();
    // true - воспроизводим все треки в очереди (новые в том числе), false - скипаем всю очередь (новые в т.ч.)
    let active = true;
    // индекс текущего трека в tracks
    let cursor = 0;

    const play = () => {
        if (cursor >= tracks.length) {
            if (tracks.some((track) => !track.loaded)) {
                return;
            }

            // очищаем коллекцию, если все треки были воспроизведены
            cursor = 0;
            tracks.clear();
            return;
        }

        // рекурсивно последовательно включаем треки из очереди
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
            /// если trackId нет в коллекции - создаем трек
            /// по окончании проигрывания - запускаем следующий трек, вызывая play
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
            // все чанки трека загружены
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

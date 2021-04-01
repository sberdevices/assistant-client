import { createNanoEvents } from './nanoevents';
import { VoicePlayerSettings } from './typings';

const AudioContext = window.AudioContext || window.webkitAudioContext;

type BytesArraysSizes = {
    incomingMessageVoiceDataLength: number;
    sourceLen: number;
    start: number;
    prepend: number | null;
};

const from16BitToFloat32 = (incomingData: Int16Array) => {
    const l = incomingData.length;
    const outputData = new Float32Array(l);
    for (let i = 0; i < l; i += 1) {
        outputData[i] = incomingData[i] / 32768.0;
    }
    return outputData;
};

const createChunkQueue = <T extends AudioBufferSourceNode>() => {
    const buffer: Array<T> = []; // очередь на воспроизведение
    const chunks: Array<T> = []; // очередь воспроизведения

    let duration = 0; // продолжительность очереди на воспроизведение
    let loaded = false; // флаг завершения загрузки

    /** Добавить чанк в очередь на воспроизведение */
    const push = (chunk: T) => {
        buffer.push(chunk);
        duration += chunk.buffer?.duration || 0;
    };

    /** Добавить чанк в очередь воспроизведения */
    const toPlay = (chunk: T) => {
        chunks.push(chunk);
    };

    /** Удалить чанк из очереди воспроизведения */
    const remove = (chunk: T) => {
        chunks.splice(chunks.indexOf(chunk), 1);
    };

    /** Получить очередь на воспроизведение */
    const popAll = (): Array<T> => {
        duration = 0;
        return buffer.splice(0, buffer.length);
    };

    /** Проставляем признак окончания загрузки трека */
    const allLoaded = () => {
        loaded = true;
    };

    return {
        get bufferLen() {
            return buffer.length;
        },
        allLoaded,
        toPlay,
        remove,
        push,
        popAll,
        get length() {
            return chunks.length;
        },
        get duration() {
            return duration;
        },
        get ended() {
            // считаем трек законченным, когда все загружено и воспроизведено
            return loaded && chunks.length === 0 && buffer.length === 0;
        },
        get loaded() {
            return loaded;
        },
    };
};

const createTrackStream = (
    ctx: AudioContext,
    {
        sampleRate = 24000,
        numberOfChannels = 1,
        delay = 0,
        onPlay,
        onEnd,
        trackStatus,
    }: {
        sampleRate?: number;
        numberOfChannels?: number;
        delay?: number;
        onPlay?: () => void;
        onEnd?: () => void;
        trackStatus?: 'stop' | 'play' | 'end';
    },
) => {
    const queue = createChunkQueue<AudioBufferSourceNode>();
    let extraByte: number | null = null;
    let status: 'stop' | 'play' | 'end' = trackStatus || 'stop';

    let lastChunkOffset = 0;
    let startTime = 0;
    let firstChunk = true;

    const end = () => {
        status = 'end';
        onEnd && onEnd();
        startTime = 0;
        lastChunkOffset = 0;
    };

    const play = () => {
        if (status === 'end') {
            return;
        }

        if (status !== 'play') {
            status = 'play';
            onPlay && onPlay();
        }

        if (queue.ended) {
            end();
            return;
        }

        if (queue.loaded || queue.duration >= delay) {
            startTime = queue.length === 0 ? ctx.currentTime : startTime;
            const chunks = queue.popAll();
            chunks.forEach((chunk) => {
                queue.toPlay(chunk);
                chunk.start(startTime + lastChunkOffset);
                lastChunkOffset += chunk.buffer?.duration || 0;
            });
        }
    };

    const getExtraBytes = (data: Uint8Array, bytesArraysSizes: BytesArraysSizes) => {
        if (extraByte == null && bytesArraysSizes.incomingMessageVoiceDataLength % 2) {
            extraByte = data[bytesArraysSizes.incomingMessageVoiceDataLength - 1];
            bytesArraysSizes.incomingMessageVoiceDataLength -= 1;
            bytesArraysSizes.sourceLen -= 1;
        } else if (extraByte != null) {
            bytesArraysSizes.prepend = extraByte;
            bytesArraysSizes.start = 1;
            if (bytesArraysSizes.incomingMessageVoiceDataLength % 2) {
                bytesArraysSizes.incomingMessageVoiceDataLength += 1;
                extraByte = null;
            } else {
                extraByte = data[bytesArraysSizes.incomingMessageVoiceDataLength - 1];
                bytesArraysSizes.sourceLen -= 1;
            }
        }
    };

    const createChunk = (chunk: Float32Array) => {
        const audioBuffer = ctx.createBuffer(numberOfChannels, chunk.length / numberOfChannels, sampleRate);
        for (let i = 0; i < numberOfChannels; i++) {
            const channelChunk = new Float32Array(chunk.length / numberOfChannels);
            let index = 0;
            for (let j = i; j < chunk.length; j += numberOfChannels) {
                channelChunk[index++] = chunk[j];
            }

            audioBuffer.getChannelData(i).set(channelChunk);
        }
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
            queue.remove(source);
            if (queue.ended) {
                status = 'end';
                onEnd && onEnd();
            }
        };
        return source;
    };

    const write = (data: Uint8Array) => {
        // 44 байта - заголовок трека
        const slicePoint = firstChunk ? 44 : 0;
        const bytesArraysSizes: BytesArraysSizes = {
            incomingMessageVoiceDataLength: data.length,
            sourceLen: data.length,
            start: 0,
            prepend: null,
        };

        firstChunk = false;

        if (slicePoint >= data.length) {
            return;
        }

        getExtraBytes(data, bytesArraysSizes);

        const dataBuffer = new ArrayBuffer(bytesArraysSizes.incomingMessageVoiceDataLength);

        const bufferUi8 = new Uint8Array(dataBuffer);
        const bufferI16 = new Int16Array(dataBuffer);

        bufferUi8.set(data.slice(0, bytesArraysSizes.sourceLen), bytesArraysSizes.start);
        if (bytesArraysSizes.prepend != null) {
            bufferUi8[0] = bytesArraysSizes.prepend;
        }

        const chunk = createChunk(from16BitToFloat32(bufferI16.slice(slicePoint)));
        queue.push(chunk);

        if (status === 'play') {
            play();
        }
    };

    return {
        get loaded() {
            return queue.loaded;
        },
        setLoaded: () => {
            queue.allLoaded();

            if (status === 'play') {
                play();
            }
        },
        write,
        get status() {
            return status;
        },
        play,
        stop: end,
    };
};

const createTrackCollection = <T extends unknown>() => {
    let trackIds: Array<string>;
    let trackMap: Map<string, T>;

    const clear = () => {
        trackIds = new Array<string>();
        trackMap = new Map<string, T>();
    };

    const add = (id: string, track: T) => {
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
        add,
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
    const { on, emit } = createNanoEvents<EventsType>();
    const tracks = createTrackCollection<ReturnType<typeof createTrackStream>>();
    // true - воспроизводим все треки в очереди (новые в том числе), false - скипаем всю очередь (новые в т.ч.)
    let active = true;
    let ctx: AudioContext | null = null;
    let cursor = 0;

    const play = () => {
        if (cursor >= tracks.length) {
            if (tracks.some((track) => !track.loaded)) {
                return;
            }

            ctx && ctx.close();
            ctx = null;
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
            if (ctx == null) {
                // шарим контекст между треками
                ctx = new AudioContext();
            }
            current = createTrackStream(ctx, {
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
            tracks.add(trackId, current);
        }

        if (data.length) {
            current.write(data);
        }

        if (last) {
            current.setLoaded();
        }

        play();
    };

    const stop = () => {
        while (cursor < tracks.length) {
            tracks.getByIndex(cursor).stop();
            cursor++;
        }

        ctx?.close();
        ctx = null;
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

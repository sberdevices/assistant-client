/** Создает структуру для хранения загружаемых и воспроизводимых частей трека */
export const createChunkQueue = <T extends AudioBufferSourceNode>() => {
    const buffer: Array<T> = []; // очередь на воспроизведение
    const chunks: Array<T> = []; // очередь воспроизведения

    let duration = 0; // продолжительность очереди на воспроизведение, сек
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
        get chunks() {
            return chunks;
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

/** Создает коллекцию треков  */
export const createTrackCollection = <T extends unknown>() => {
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

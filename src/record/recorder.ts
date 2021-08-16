export type RecorderEntry = {};
export interface RecorderHandler<M extends RecorderEntry> {
    (message: M): void;
}
export interface RecorderUpdater<R extends object> {
    (updateCallback: (record: R) => void): void;
}
export interface RecorderHandlerPreparer<M extends RecorderEntry> {
    (handler: RecorderHandler<M>): RecorderHandler<M>;
}
export interface Recorder<R extends object = {}, M extends RecorderEntry = {}> {
    stop: () => void;
    start: () => void;
    handler: RecorderHandler<M>;
    getRecord: () => R;
}
export interface BaseRecorder<R extends object, M extends RecorderEntry> extends Recorder<R, M> {
    prepareHandler: RecorderHandlerPreparer<M>;
    updateRecord: RecorderUpdater<R>;
}

export interface BaseRecorderCreator<R extends object = {}, M extends RecorderEntry = {}> {
    (defaultActive?: boolean): Recorder<R, M>;
}

export const createBaseRecorder = <R extends object, M extends object>(
    isActive = true,
    getDefaultRecord: () => R,
): BaseRecorder<R, M> => {
    let record = getDefaultRecord();

    const start = () => {
        record = getDefaultRecord();
        isActive = true;
    };

    const stop = () => {
        isActive = false;
    };

    function handler() {}

    const updateRecord: RecorderUpdater<R> = (cb) => cb(record);

    const getRecord = () => record;

    const prepareHandler: RecorderHandlerPreparer<M> = (handlerToPrepare) => (...args) => {
        if (isActive === false) {
            return;
        }

        handlerToPrepare(...args);
    };

    return {
        getRecord,
        updateRecord,
        prepareHandler,
        handler,
        stop,
        start,
    };
};

import { createNanoEvents } from './nanoevents';

export type ObserverFunc<T> = (data: T) => void;

interface Events<T extends {}> {
    next: ObserverFunc<T>;
}

export interface Observer<T extends {}> {
    next: ObserverFunc<T>;
}

export interface Observable<T extends {}> {
    subscribe: (observer: Observer<T>) => { unsubscribe: () => void };
}

export const createNanoObservable = <T extends {}>(observerFunc: (observer: Observer<T>) => void): Observable<T> => {
    const { on, emit } = createNanoEvents<Events<T>>();

    const subscribe = ({ next }: Observer<T>) => {
        const unsubscribe = on('next', next);
        return { unsubscribe };
    };

    observerFunc({
        next: (data: T) => {
            emit('next', data);
        },
    });

    return {
        subscribe,
    };
};

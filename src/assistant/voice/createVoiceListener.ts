import { createNanoEvents } from '../../nanoevents';

import { createNavigatorAudioProvider } from './createNavigatorAudioProvider';

type voiceStreamEvents = {
    status: (status: 'listen' | 'started' | 'stopped') => void;
    hypotesis: (text: string, last: boolean) => void;
};

export const createVoiceListener = (
    createAudioProvider: (
        cb: (data: ArrayBuffer, last: boolean) => void,
    ) => Promise<() => void> = createNavigatorAudioProvider,
) => {
    const { emit, on } = createNanoEvents<voiceStreamEvents>();
    let stopRecord: () => void;
    let status: 'listen' | 'started' | 'stopped' = 'stopped';

    const stop = () => {
        status = 'stopped';
        stopRecord();
        emit('status', 'stopped');
    };

    const listen = (handleVoice: (data: Uint8Array, last: boolean) => void): Promise<void> => {
        status = 'started';
        emit('status', 'started');

        return createAudioProvider((data: ArrayBuffer, last: boolean) => handleVoice(new Uint8Array(data), last))
            .then((recStop) => {
                stopRecord = recStop;
            })
            .then(() => {
                status = 'listen';
                emit('status', 'listen');
            })
            .catch((err) => {
                status = 'stopped';
                emit('status', 'stopped');
                throw err;
            });
    };

    return {
        listen,
        stop,
        on,
        get status() {
            return status;
        },
    };
};

import { createNanoEvents } from '../../nanoevents';

import { createNavigatorAudioProvider } from './createNavigatorAudioProvider';

type voiceStreamEvents = {
    status: (status: 'listen' | 'stopped') => void;
    hypotesis: (text: string, last: boolean) => void;
};

export const createVoiceListener = (
    createAudioProvider: (
        cb: (data: ArrayBuffer, last: boolean) => void,
    ) => Promise<() => void> = createNavigatorAudioProvider,
) => {
    const { emit, on } = createNanoEvents<voiceStreamEvents>();
    let stopRecord: () => void;
    let status: 'listen' | 'stopped' = 'stopped';

    const stop = () => {
        status = 'stopped';
        stopRecord();
        emit('status', 'stopped');
    };

    const listen = (handleVoice: (data: Uint8Array, last: boolean) => void): Promise<void> =>
        createAudioProvider((data: ArrayBuffer, last: boolean) => handleVoice(new Uint8Array(data), last))
            .then((recStop) => {
                stopRecord = recStop;
            })
            .then(() => {
                status = 'listen';
                emit('status', 'listen');
            });

    return {
        listen,
        stop,
        on,
        get status() {
            return status;
        },
    };
};

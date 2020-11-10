import { PacketWrapperFromServer } from './asr';
import { MESSAGE_NAMES } from './client';
import { createNavigatorAudioProvider } from './createNavigatorAudioProvider';
import { createNanoEvents } from './nanoevents';
import { OriginalMessageType } from './typings';

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
    let off: () => void;
    let status: 'listen' | 'stopped' = 'stopped';

    const stop = () => {
        status = 'stopped';
        off();
        stopRecord();
        emit('status', 'stopped');
    };

    const listen = ({
        sendVoice,
        messageId,
        onMessage,
    }: {
        sendVoice: (data: Uint8Array, last: boolean) => void;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) => {
        status = 'listen';
        createAudioProvider((data: ArrayBuffer, last: boolean) => sendVoice(new Uint8Array(data), last)).then(
            (recStop) => {
                stopRecord = recStop;
                off = onMessage((message: OriginalMessageType) => {
                    if (message.status && message.status.code != null && message.status.code < 0) {
                        stop();
                    }

                    if (message.messageId === messageId && message.messageName === MESSAGE_NAMES.STT) {
                        if (message.text) {
                            emit('hypotesis', message.text.data || '', message.last === 1);
                            if (message.last === 1) {
                                stop();
                            }
                        }

                        if (message.bytes?.data) {
                            const { decoderResultField } = PacketWrapperFromServer.decode(message.bytes.data);

                            if (decoderResultField && decoderResultField.hypothesis?.length) {
                                emit(
                                    'hypotesis',
                                    decoderResultField.hypothesis[0].normalizedText || '',
                                    !!decoderResultField.isFinal,
                                );
                                if (decoderResultField.isFinal) {
                                    stop();
                                }
                            }
                        }
                    }
                });
            },
        );
        emit('status', 'listen');
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

import { PacketWrapperFromServer } from './asr';
import { createVoiceListener } from './createVoiceListener';
import { createNanoEvents } from './nanoevents';
import { MessageNames, OriginalMessageType } from './typings';

type speechRecognizerEvents = {
    hypotesis: (text: string, last: boolean) => void;
};

export const createSpeechRecognizer = (voiceListener: ReturnType<typeof createVoiceListener>) => {
    const { emit, on } = createNanoEvents<speechRecognizerEvents>();
    let off: () => void;
    let status: 'active' | 'inactive' = 'inactive';

    const stop = () => {
        status = 'inactive';
        off();
        voiceListener.stop();
    };

    const start = ({
        sendVoice,
        messageId,
        onMessage,
    }: {
        sendVoice: (data: Uint8Array, last: boolean) => void;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) => {
        voiceListener.listen(sendVoice).then(() => {
            status = 'active';
            off = onMessage((message: OriginalMessageType) => {
                if (message.status && message.status.code != null && message.status.code < 0) {
                    stop();
                }

                if (message.messageId === messageId && message.messageName === MessageNames.STT) {
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
        });
    };

    return {
        start,
        stop,
        on,
        get status() {
            return status;
        },
    };
};

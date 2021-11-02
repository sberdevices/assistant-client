import { createNanoEvents } from '../../../nanoevents';
import { MessageNames, OriginalMessageType } from '../../../typings';
import { createVoiceListener, VoiceHandler } from '../listener/voiceListener';

import { PacketWrapperFromServer } from './asr';

type speechRecognizerEvents = {
    hypotesis: (text: string, last: boolean, mid: OriginalMessageType['messageId']) => void;
};

export const createSpeechRecognizer = (voiceListener: ReturnType<typeof createVoiceListener>) => {
    const { emit, on } = createNanoEvents<speechRecognizerEvents>();
    let off: () => void;
    let status: 'active' | 'inactive' = 'inactive';
    let currentMessageId: number;

    const stop = () => {
        if (voiceListener.status !== 'stopped') {
            status = 'inactive';
            voiceListener.stop();
        }
    };

    const start = ({
        sendVoice,
        messageId,
        onMessage,
    }: {
        sendVoice: VoiceHandler;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) =>
        voiceListener.listen(sendVoice).then(() => {
            status = 'active';
            currentMessageId = messageId;
            off = onMessage((message: OriginalMessageType) => {
                if (message.status && message.status.code != null && message.status.code < 0) {
                    off();
                    stop();
                }

                if (message.messageId === messageId && message.messageName === MessageNames.STT) {
                    if (message.text) {
                        emit('hypotesis', message.text.data || '', message.last === 1, message.messageId);
                        if (message.last === 1) {
                            off();
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
                                message.messageId,
                            );
                            if (decoderResultField.isFinal) {
                                off();
                                stop();
                            }
                        }
                    }
                }
            });
        });

    return {
        start,
        stop,
        on,
        get status() {
            return status;
        },
        get messageId() {
            return currentMessageId;
        },
    };
};

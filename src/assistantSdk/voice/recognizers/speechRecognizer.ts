import { createNanoEvents } from '../../../nanoevents';
import { MessageNames, OriginalMessageType } from '../../../typings';
import { createVoiceListener } from '../listener/voiceListener';
import { createWatchdog } from '../watchdog';

import { PacketWrapperFromServer } from './asr';

type speechRecognizerEvents = {
    hypotesis: (text: string, last: boolean, mid: OriginalMessageType['messageId']) => void;
    error: () => void;
};

export const createSpeechRecognizer = (voiceListener: ReturnType<typeof createVoiceListener>) => {
    const { emit, on } = createNanoEvents<speechRecognizerEvents>();
    let off: () => void;
    let status: 'active' | 'inactive' = 'inactive';
    let currentMessageId: number;
    let watchdog: ReturnType<typeof createWatchdog>;

    const stop = () => {
        if (voiceListener.status !== 'stopped') {
            status = 'inactive';
            voiceListener.stop();
            watchdog?.deactivate();
        }
    };

    const start = ({
        sendVoice,
        messageId,
        onMessage,
    }: {
        sendVoice: (data: Uint8Array, last: boolean) => void;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) =>
        voiceListener
            .listen((data) => sendVoice(data, false))
            .then(() => {
                status = 'active';
                currentMessageId = messageId;
                off = onMessage((message: OriginalMessageType) => {
                    if (status !== 'active') {
                        return;
                    }

                    if (message.status && message.status.code != null && message.status.code < 0) {
                        off();
                        stop();
                        sendVoice(new Uint8Array(), true);
                    }

                    if (message.messageId === messageId && message.messageName === MessageNames.STT) {
                        if (message.text) {
                            emit('hypotesis', message.text.data || '', message.last === 1, message.messageId);
                            if (message.last === 1) {
                                off();
                                stop();
                                sendVoice(new Uint8Array(), true);
                            }
                        }

                        if (message.bytes?.data) {
                            const { decoderResultField } = PacketWrapperFromServer.decode(message.bytes.data);

                            watchdog.tick();
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
                                    sendVoice(new Uint8Array(), true);
                                }
                            }
                        }
                    }
                });

                watchdog = createWatchdog({
                    onReset: () => {
                        off();
                        stop();
                        emit('error');
                    },
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

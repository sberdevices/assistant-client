import { OriginalMessageType, MessageNames } from '../../../typings';
import { createVoiceListener } from '../listener/voiceListener';

import { Music2TrackProtocol } from './mtt';

export const createMusicRecognizer = (voiceListener: ReturnType<typeof createVoiceListener>) => {
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
        sendVoice: (data: Uint8Array, last: boolean, messageName?: string) => void;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) =>
        voiceListener
            .listen((data: Uint8Array, last: boolean) => !last && sendVoice(data, last, MessageNames.MUSIC_RECOGNITION))
            .then(() => {
                status = 'active';
                currentMessageId = messageId;
                off = onMessage((message: OriginalMessageType) => {
                    if (message.status && message.status.code != null && message.status.code < 0) {
                        off();
                        stop();
                    }

                    if (
                        message.messageId === messageId &&
                        message.messageName.toUpperCase() === MessageNames.MUSIC_RECOGNITION
                    ) {
                        if (!message.bytes?.data?.length) {
                            return;
                        }

                        const { decoderResultField, errorResponse } = Music2TrackProtocol.MttResponse.decode(
                            message.bytes.data,
                        );
                        if (decoderResultField?.isFinal || errorResponse) {
                            off();
                            stop();
                        }
                    }
                });
            });

    return {
        start,
        stop,
        get status() {
            return status;
        },
        get messageId() {
            return currentMessageId;
        },
    };
};

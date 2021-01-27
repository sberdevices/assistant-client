import { OriginalMessageType, MessageNames } from './typings';
import { MttResponse } from './mtt';
import { createVoiceListener } from './createVoiceListener';

export const createMusicRecognizer = (voiceListener: ReturnType<typeof createVoiceListener>) => {
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
        sendVoice: (data: Uint8Array, last: boolean, messageName?: string) => void;
        messageId: number;
        onMessage: (cb: (message: OriginalMessageType) => void) => () => void;
    }) => {
        status = 'active';
        voiceListener.listen(
            (data: ArrayBuffer, last: boolean) =>
                !last && sendVoice(new Uint8Array(data), last, MessageNames.MUSIC_RECOGNITION),
        );

        off = onMessage((message: OriginalMessageType) => {
            if (message.status && message.status.code != null && message.status.code < 0) {
                stop();
            }

            if (
                message.messageId === messageId &&
                message.messageName.toUpperCase() === MessageNames.MUSIC_RECOGNITION
            ) {
                if (!message.bytes?.data?.length) {
                    return;
                }

                const { decoderResultField, errorResponse } = MttResponse.decode(message.bytes.data);
                if (decoderResultField?.isFinal || errorResponse) {
                    stop();
                }
            }
        });
    };

    return {
        start,
        stop,
        get status() {
            return status;
        },
    };
};

import { PacketWrapperFromServer } from './asr';
import { createClient, MESSAGE_NAMES } from './client';
import { createNanoEvents } from './nanoevents';
import { Voice, SystemMessage } from './proto';
import { EmotionEmitterType, VoiceEmotionType } from './typings';

export const createVoiceStreamFactory = (
    vpsClient: ReturnType<typeof createClient>,
    emitEmotion?: EmotionEmitterType,
) => (meta?: Record<string, any>, parameterMessageId?: number) => {
    if (window.AssistantClient?.onRequestState) window.AssistantClient.onRequestState();

    const messageId = parameterMessageId || vpsClient.currentMessageId;

    let hasFinished = false;
    let off: (() => void) | undefined;
    const stop = () => {
        !hasFinished && emitEmotion?.('emotion', { voiceStatus: 'recordStoped', messageId });
        hasFinished = true;
        off?.();
        off = undefined;
    };

    type voiceStreamEvents = {
        stt: (text: string, last: boolean) => void;
    };
    emitEmotion?.('emotion', { voiceStatus: 'recordStarted', messageId });

    const voiceStreamEM = createNanoEvents<voiceStreamEvents>();

    const write = (data: ArrayBuffer, last = false) => {
        if (!hasFinished) {
            vpsClient.send({
                payload: {
                    voice: Voice.create({
                        data: new Uint8Array(data),
                    }),
                    last: -1,
                },
                messageId,
            });

            if (last) {
                stop();
            }
        }
    };

    meta &&
        vpsClient.send({
            payload: { systemMessage: SystemMessage.create({ data: JSON.stringify(meta) }), last: -1 },
            messageId,
        });

    off = vpsClient.on('message', (message) => {
        if (message.status && message.status.code != null && message.status.code < 0) {
            stop();
        }

        if (message.messageId === messageId && message.messageName === MESSAGE_NAMES.STT) {
            if (message.last === 1) {
                stop();
                vpsClient.send({ payload: { voice: Voice.create(), last: 1 }, messageId });
            }
            if (message.text) {
                voiceStreamEM.emit('stt', message.text.data || '', message.last === 1);
            }

            if (message.bytes?.data) {
                const { decoderResultField } = PacketWrapperFromServer.decode(message.bytes.data);
                const emotion = decoderResultField?.emotionResult;

                if (emotion) {
                    emitEmotion?.('voiceEmotion', emotion as VoiceEmotionType[]);
                }

                if (decoderResultField?.hypothesis?.length) {
                    voiceStreamEM.emit(
                        'stt',
                        decoderResultField.hypothesis[0].normalizedText || '',
                        !!decoderResultField.isFinal,
                    );
                }
            }
        }
    });

    return {
        write,
        answerToUser: vpsClient.waitForAnswerToUser(messageId),
        on: voiceStreamEM.on,
    };
};

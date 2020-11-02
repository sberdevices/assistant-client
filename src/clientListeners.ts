import { createClient } from './client';
import { createVoicePlayer, VoicePlayerSettings } from './createVoicePlayer';
import { AssistantEmotionType, EmotionEmitterType } from './typings';

type VoiceMessageChunks = Array<{ data: Uint8Array; messageId: number }>;
export const createVoicePlayerListener = (
    vpsClient: ReturnType<typeof createClient>,
    emitEmotion?: EmotionEmitterType,
    voiceSettings?:VoicePlayerSettings
) => {
    const voicePlayer = createVoicePlayer(voiceSettings);
    let voiceMessageQueue: VoiceMessageChunks = [];
    let playingMessageId: number | undefined;

    const appendData = (data: Uint8Array) => {
        voicePlayer.streamToDataToPlayer(data);
    };

    const startMessagePlaying = (data: Uint8Array, messageId: number) => {
        playingMessageId = messageId;
        voicePlayer.streamToDataToPlayer(data, {
            onStart: () => {
                emitEmotion?.('emotion', { voiceStatus: 'playStarted', messageId });
            },
            onFinish: () => {
                playingMessageId = undefined;
                emitEmotion?.('emotion', { voiceStatus: 'playStoped', messageId });
                const chunk = voiceMessageQueue.shift();
                if (chunk) {
                    startMessagePlaying(chunk.data, chunk.messageId);
                    voiceMessageQueue = voiceMessageQueue.reduce((acc, curr) => {
                        if (curr.messageId === playingMessageId) {
                            appendData(curr.data);
                        } else {
                            acc.push(curr);
                        }
                        return acc;
                    }, [] as VoiceMessageChunks);
                }
            },
        });
    };

    vpsClient.on('message', (message) => {
        // добавляем сообщения в очередь, если у него другой messageId, чтобы корректно отрабатывались
        // события playStarted и playStoped
        const messageId = Number(message.messageId);
        if (!message.voice?.data?.length) {
            return;
        }
        if (!playingMessageId) {
            startMessagePlaying(message.voice.data, messageId);
            return;
        }
        if (playingMessageId === messageId) {
            appendData(message.voice.data);
            return;
        }

        voiceMessageQueue.push({ data: message.voice?.data, messageId });
    });

    const finishPlayback = (clearMessageQueue?: boolean) => {
        if (clearMessageQueue) {
            playingMessageId = undefined;
            voiceMessageQueue = [];
        }
        voicePlayer.finishPlayback();
    };
    return { ...voicePlayer, finishPlayback };
};

export const bindEmotionListener = (vpsClient: ReturnType<typeof createClient>, emitEmotion?: EmotionEmitterType) =>
    vpsClient.on('systemMessage', (systemMessage, original) => {
        if (systemMessage.emotion) {
            emitEmotion?.('emotion', {
                ...systemMessage.emotion,
                messageId: Number(original.messageId),
            } as AssistantEmotionType);
        }
    });

import { createClient } from '../client/client';
import { EmotionId, OriginalMessageType, SystemMessageDataType } from '../../typings';

import { createMusicRecognizer } from './recognizers/musicRecognizer';
import { createSpeechRecognizer } from './recognizers/speechRecognizer';
import { createVoiceListener } from './listener/voiceListener';
import { createVoicePlayer } from './player/voicePlayer';
import { resolveAudioContext, isAudioSupported } from './audioContext';

export const createVoice = (
    client: ReturnType<typeof createClient>,
    emit: (event: {
        asr?: { text: string; last?: boolean; mid?: OriginalMessageType['messageId'] }; // lasr и mid нужен для отправки исх бабла в чат
        emotion?: EmotionId;
    }) => void,
    /// пока onReady не вызван, треки не воспроизводятся
    /// когда случится onReady, очередь треков начнет проигрываться
    onReady?: () => void,
) => {
    let voicePlayer: ReturnType<typeof createVoicePlayer>;
    const listener = createVoiceListener();
    const musicRecognizer = createMusicRecognizer(listener);
    const speechRecognizer = createSpeechRecognizer(listener);
    const subscriptions: Array<() => void> = [];

    const settings = {
        disableDubbing: false,
        disableListening: false,
    };

    let isPlaying = false; // проигрывается/не проигрывается озвучка
    let autolistenMesId: string | null = null; // id сообщения, после проигрывания которого, нужно активировать слушание
    let wasDisabledDubbing = false; // состояние озвучки на момент включения слушания

    /** останавливает слушание голоса, возвращает true - если слушание было активно */
    const stopListening = (): boolean => {
        const result = speechRecognizer.status === 'active' || musicRecognizer.status === 'active';

        autolistenMesId = null;
        if (speechRecognizer.status === 'active') {
            speechRecognizer.stop();
            client.sendCancel(speechRecognizer.messageId);
            return true;
        }

        if (musicRecognizer.status === 'active') {
            musicRecognizer.stop();
            client.sendCancel(musicRecognizer.messageId);
            return true;
        }

        return result;
    };

    /** Останавливает слушание и воспроизведение */
    const stop = () => {
        // здесь важен порядок остановки голоса
        stopListening();
        voicePlayer?.stop();
    };

    /** Активирует слушание голоса
     * если было активно слушание или проигрывание - останавливает, слушание в этом случае не активируется
     */
    const listen = async ({ begin }: { begin?: ArrayBuffer[] } = {}): Promise<void> => {
        if (stopListening()) {
            return;
        }

        if (isPlaying) {
            voicePlayer?.stop();
            return;
        }

        if (settings.disableListening) {
            return;
        }

        // повторные вызовы не пройдут, пока пользователь не разрешит/запретит аудио
        if (listener.status === 'stopped') {
            wasDisabledDubbing = settings.disableDubbing;
            return client.createVoiceStream(({ sendVoice, messageId, onMessage }) => {
                begin?.forEach((chunk) => sendVoice(new Uint8Array(chunk), false));

                return speechRecognizer.start({
                    sendVoice,
                    messageId,
                    onMessage,
                });
            });
        }
    };

    /** Активирует распознавание музыки
     * если было активно слушание или проигрывание - останавливает, распознование музыки в этом случае не активируется
     */
    const shazam = () => {
        if (stopListening()) {
            return;
        }

        if (isPlaying) {
            voicePlayer?.stop();
        }

        if (settings.disableListening) {
            return;
        }

        // повторные вызовы не пройдут, пока пользователь не разрешит/запретит аудио
        if (listener.status === 'stopped') {
            wasDisabledDubbing = settings.disableDubbing;
            client.createVoiceStream(({ sendVoice, messageId, onMessage }) =>
                musicRecognizer.start({
                    sendVoice,
                    messageId,
                    onMessage,
                }),
            );
        }
    };

    if (isAudioSupported) {
        resolveAudioContext((context) => {
            /// создаем плеер только если поддерживается аудио
            /// и только когда готов AudioContext
            voicePlayer = createVoicePlayer(context, { startVoiceDelay: 1 });

            // начало проигрывания озвучки
            subscriptions.push(
                voicePlayer.on('play', () => {
                    isPlaying = true;
                    emit({ emotion: 'talk' });
                }),
            );

            // окончание проигрывания озвучки
            subscriptions.push(
                voicePlayer.on('end', (mesId: string) => {
                    isPlaying = false;
                    emit({ emotion: 'idle' });

                    if (mesId === autolistenMesId) {
                        listen();
                    }
                }),
            );

            // оповещаем о готовности к воспроизведению звука
            onReady && onReady();
        });
    }

    // обработка входящей озвучки
    subscriptions.push(
        client.on('voice', (data, message) => {
            if (settings.disableDubbing) {
                return;
            }

            voicePlayer?.append(data, message.messageId.toString(), message.last === 1);
        }),
    );

    // гипотезы распознавания речи
    subscriptions.push(
        speechRecognizer.on('hypotesis', (text: string, isLast: boolean, mid: number | Long) => {
            emit({
                asr: {
                    text: listener.status === 'listen' && !settings.disableListening ? text : '',
                    last: isLast,
                    mid,
                },
            });
        }),
    );

    // статусы слушания речи
    subscriptions.push(
        listener.on('status', (status: 'listen' | 'started' | 'stopped') => {
            if (status === 'listen') {
                voicePlayer?.setActive(false);
                emit({ emotion: 'listen' });
            } else if (status === 'stopped') {
                voicePlayer?.setActive(!settings.disableDubbing);
                emit({ asr: { text: '' }, emotion: 'idle' });
            }
        }),
    );

    // активация автослушания
    subscriptions.push(
        client.on('systemMessage', (systemMessage: SystemMessageDataType, originalMessage: OriginalMessageType) => {
            const { auto_listening: autoListening } = systemMessage;

            if (autoListening) {
                /// если озвучка включена - сохраняем mesId чтобы включить слушание после озвучки
                /// если озвучка выключена - включаем слушание сразу

                if (!wasDisabledDubbing) {
                    autolistenMesId = originalMessage.messageId.toString();
                } else {
                    listen();
                }
            }
        }),
    );

    return {
        destroy: () => {
            stopListening();
            voicePlayer?.setActive(false);
            subscriptions.splice(0, subscriptions.length).map((unsubscribe) => unsubscribe());
        },
        change: (newSettings: { disableDubbing?: boolean; disableListening?: boolean }) => {
            const { disableDubbing, disableListening } = newSettings;

            /// ниже важен порядок обработки флагов слушания и озвучки
            /// сначала слушание, потом озвучка

            // вкл/выкл фичи листенинга
            if (typeof disableListening !== 'undefined' && settings.disableListening !== disableListening) {
                settings.disableListening = disableListening;
                if (disableListening === true) {
                    stopListening();
                }
            }

            // вкл/выкл фичи озвучки
            if (typeof disableDubbing !== 'undefined' && settings.disableDubbing !== disableDubbing) {
                settings.disableDubbing = disableDubbing;
                voicePlayer?.setActive(!disableDubbing);
            }

            Object.assign(settings, newSettings);
        },
        listen,
        shazam,
        stop,
        stopPlaying: () => {
            voicePlayer?.stop();
        },
    };
};

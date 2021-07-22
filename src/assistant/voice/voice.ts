import { createClient } from '../client/client';
import { EmotionId, OriginalMessageType, SystemMessageDataType } from '../../typings';

import { createMusicRecognizer } from './createMusicRecognizer';
import { createSpeechRecognizer } from './createSpeechRecognizer';
import { createVoiceListener } from './createVoiceListener';
import { createVoicePlayer } from './player/voicePlayer';

export const createVoice = (
    client: ReturnType<typeof createClient>,
    emit: (event: {
        asr?: { text: string; last?: boolean; mid?: OriginalMessageType['messageId'] }; // lasr и mid нужен для отправки исх бабла в чат
        emotion?: EmotionId;
    }) => void,
) => {
    const voicePlayer = createVoicePlayer({ startVoiceDelay: 1 });
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

    /** остановливает слушание голоса, возвращает true - если слушание было активно */
    const stopListening = (force = false): boolean => {
        const result = speechRecognizer.status === 'active' || musicRecognizer.status === 'active';

        autolistenMesId = null;
        if (speechRecognizer.status === 'active') {
            speechRecognizer.stop();
            client.sendCancel(speechRecognizer.messageId);
            if (!force) {
                return true;
            }
        }

        if (musicRecognizer.status === 'active') {
            musicRecognizer.stop();
            client.sendCancel(musicRecognizer.messageId);
            if (!force) {
                return true;
            }
        }

        return result;
    };

    /** Останавливает слушание и воспроизведение */
    const stop = () => {
        // здесь важен порядок остановки голоса
        stopListening(true);
        voicePlayer.stop();
    };

    /** Активирует слушание голоса
     * если было активно слушание или проигрывание - останавливает, слушание в этом случае не активируется
     */
    const listen = () => {
        if (stopListening()) {
            return;
        }

        if (isPlaying) {
            voicePlayer.stop();
            return;
        }

        if (settings.disableListening) {
            return;
        }

        // повторные вызовы не пройдут, пока пользователь не разрешит/запретит аудио
        if (listener.status === 'stopped') {
            client.createVoiceStream(({ sendVoice, messageId, onMessage }) =>
                speechRecognizer.start({
                    sendVoice,
                    messageId,
                    onMessage,
                }),
            );
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
            voicePlayer.stop();
        }

        if (settings.disableListening) {
            return;
        }

        // повторные вызовы не пройдут, пока пользователь не разрешит/запретит аудио
        if (listener.status === 'stopped') {
            client.createVoiceStream(({ sendVoice, messageId, onMessage }) =>
                musicRecognizer.start({
                    sendVoice,
                    messageId,
                    onMessage,
                }),
            );
        }
    };

    // обработка входящей озвучки
    subscriptions.push(
        client.on('voice', (data, message) => {
            if (settings.disableDubbing) {
                return;
            }

            voicePlayer.append(data, message.messageId.toString(), message.last === 1);
        }),
    );

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
                voicePlayer.active = false;
                emit({ emotion: 'listen' });
            } else if (status === 'stopped') {
                voicePlayer.active = !settings.disableDubbing;
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
                if (!settings.disableDubbing) {
                    autolistenMesId = originalMessage.messageId.toString();
                } else {
                    listen();
                }
            }
        }),
    );

    return {
        destroy: () => {
            stopListening(true);
            voicePlayer.active = false;
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
                    stopListening(true);
                }
            }

            // вкл/выкл фичи озвучки
            if (typeof disableDubbing !== 'undefined' && settings.disableDubbing !== disableDubbing) {
                settings.disableDubbing = disableDubbing;
                voicePlayer.active = !disableDubbing;
            }

            Object.assign(settings, newSettings);
        },
        listen,
        shazam,
        stop,
    };
};

import { createNanoEvents } from '../../nanoevents';

export const isAudioSupported = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);

const createBrowserAudioContext = (): AudioContext => {
    if (window.AudioContext) {
        return new AudioContext();
    }

    if (window.webkitAudioContext) {
        // eslint-disable-next-line new-cap
        return new window.webkitAudioContext();
    }

    throw new Error('Audio not supported');
};

interface ContextEvents {
    ready: () => void;
}

const { on, emit } = createNanoEvents<ContextEvents>();

let audioContext: { context: AudioContext; ready: boolean; on: typeof on };

export const createAudioContext = (onReady: (context: AudioContext) => void) => {
    if (!audioContext) {
        const isSafari = navigator.vendor.search('Apple') >= 0;
        const context = createBrowserAudioContext();

        audioContext = {
            context,
            ready: !isSafari && context.state === 'running',
            on,
        };

        if (!audioContext.ready) {
            const handleClick = () => {
                document.removeEventListener('click', handleClick);
                document.removeEventListener('touchstart', handleClick);

                if (isSafari) {
                    /// проигрываем тишину, т.к нужно что-то проиграть,
                    /// чтобы сафари разрешил воспроизводить звуки в любой момент в этом контексте
                    const oscillator = audioContext.context.createOscillator();
                    oscillator.frequency.value = 0;
                    oscillator.connect(audioContext.context.destination);
                    oscillator.start(0);
                    oscillator.stop(0.5);
                }

                if (audioContext.context.state === 'suspended') {
                    /// Developers who write games, WebRTC applications, or other websites that use the Web Audio API
                    /// should call context.resume() after the first user gesture (e.g. a click, or tap)
                    /// https://sites.google.com/a/chromium.org/dev/audio-video/autoplay
                    audioContext.context.resume();
                }

                audioContext.ready = true;
                emit('ready');
            };

            // для пк
            document.addEventListener('click', handleClick);
            // для мобильных устройств
            document.addEventListener('touchstart', handleClick);
        }
    }

    if (audioContext.ready) {
        onReady && onReady(audioContext.context);
    } else {
        const unsubscribe = on('ready', () => {
            onReady(audioContext.context);
            unsubscribe();
        });
    }
};

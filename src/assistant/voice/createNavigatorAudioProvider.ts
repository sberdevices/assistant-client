const createAudioContext = (options?: AudioContextOptions): AudioContext => {
    if (window.AudioContext) {
        return new AudioContext(options);
    }

    if (window.webkitAudioContext) {
        // eslint-disable-next-line new-cap
        return new window.webkitAudioContext();
    }

    throw new Error('Audio-context not supported');
};

let context: AudioContext;
let processor: ScriptProcessorNode;

const downsampleBuffer = (buffer: Float32Array, sampleRate: number, outSampleRate: number) => {
    if (outSampleRate > sampleRate) {
        throw new Error('downsampling rate show be smaller than original sample rate');
    }
    const sampleRateRatio = sampleRate / outSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    let empty = true;

    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
        const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }

        if (empty && accum > 0) {
            empty = false;
        }

        result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return {
        buffer: result.buffer,
        empty,
    };
};

const TARGET_SAMPLE_RATE = 16000;
const IS_FIREFOX = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const createAudioRecorder = (stream: MediaStream, cb: (buffer: ArrayBuffer, last: boolean) => void) => {
    let state: 'inactive' | 'recording' = 'inactive';
    let input: MediaStreamAudioSourceNode;

    const start = () => {
        if (state !== 'inactive') {
            throw new Error("Can't start not inactive recorder");
        }

        state = 'recording';

        if (!context) {
            context = createAudioContext({
                // firefox не умеет выравнивать samplerate, будем делать это самостоятельно
                sampleRate: IS_FIREFOX ? undefined : TARGET_SAMPLE_RATE,
            });
        }

        input = context.createMediaStreamSource(stream);

        if (!processor) {
            processor = context.createScriptProcessor(2048, 1, 1);
        }

        const listener = (e: AudioProcessingEvent) => {
            const buffer = e.inputBuffer.getChannelData(0);
            const data = downsampleBuffer(buffer, context.sampleRate, TARGET_SAMPLE_RATE);

            const last = state === 'inactive';
            cb(data.buffer, last);

            if (last) {
                processor.removeEventListener('audioprocess', listener);
            }
        };

        processor.addEventListener('audioprocess', listener);

        input.connect(processor);
        processor.connect(context.destination);
    };

    const stop = () => {
        if (state === 'inactive') {
            throw new Error("Can't stop inactive recorder");
        }

        state = 'inactive';
        stream.getTracks().forEach((track) => {
            track.stop();
        });
        input.disconnect();
    };

    start();

    return stop;
};

export const createNavigatorAudioProvider = (cb: (buffer: ArrayBuffer, last: boolean) => void) =>
    navigator.mediaDevices
        .getUserMedia({
            audio: true,
        })
        .then((stream) => createAudioRecorder(stream, cb));

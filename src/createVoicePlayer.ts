const START_VOICE_DELAY = 0.2;

const AudioContext = window.AudioContext || window.webkitAudioContext;

type BytesArraysSizes = {
    incomingMessageVoiceDataLength: number;
    sourceLen: number;
    start: number;
    prepend: number | null;
};

const createSoundBuffer = (
    ctx: AudioContext,
    sampleRate: number,
    finishPlayback: () => void,
    bufferSize = 6,
    delay = 0,
) => {
    const chunks: Array<AudioBufferSourceNode> = [];
    let startTime = 0;
    let lastChunkOffset = 0;
    let totalChunksDuration = 0;
    let isPlaying = false;

    const createChunk = (chunk: Float32Array) => {
        const audioBuffer = ctx.createBuffer(1, chunk.length, sampleRate);
        audioBuffer.getChannelData(0).set(chunk);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
            chunks.splice(chunks.indexOf(source), 1);
            if (chunks.length === 0) {
                isPlaying = false;
                startTime = 0;
                lastChunkOffset = 0;
                totalChunksDuration = 0;
                finishPlayback();
            }
        };
        totalChunksDuration += source.buffer.duration;
        return source;
    };

    const chunkStart = (chunk: AudioBufferSourceNode) => {
        chunk.start(startTime + lastChunkOffset);
        lastChunkOffset += chunk.buffer?.duration || 0;
    };

    const doPlay = () => {
        isPlaying = true;
        startTime = ctx.currentTime;
        lastChunkOffset = 0;
        chunks.forEach((chunk) => chunkStart(chunk));
    };

    const write = (data: Float32Array) => {
        const chunk = createChunk(data);
        chunks.push(chunk);
        if (isPlaying && chunks.length <= bufferSize) {
            chunkStart(chunk);
            return;
        }
        if (totalChunksDuration > delay) doPlay();
    };

    return {
        write,
    };
};

const from16BitToFloat32 = (incomingData: Int16Array) => {
    const l = incomingData.length;
    const outputData = new Float32Array(l);
    for (let i = 0; i < l; i += 1) {
        outputData[i] = incomingData[i] / 32768.0;
    }
    return outputData;
};

export const createVoicePlayer = () => {
    let audioContextForPlayback: AudioContext | null = null;
    let audioSlices: Array<Uint8Array> = [];
    let extraByte: number | null = null;
    let soundBuffer: ReturnType<typeof createSoundBuffer> | null = null;

    const getExtraBytes = (data: Uint8Array, bytesArraysSizes: BytesArraysSizes) => {
        if (extraByte == null && bytesArraysSizes.incomingMessageVoiceDataLength % 2) {
            extraByte = data[bytesArraysSizes.incomingMessageVoiceDataLength - 1];
            bytesArraysSizes.incomingMessageVoiceDataLength -= 1;
            bytesArraysSizes.sourceLen -= 1;
        } else if (extraByte != null) {
            bytesArraysSizes.prepend = extraByte;
            bytesArraysSizes.start = 1;
            if (bytesArraysSizes.incomingMessageVoiceDataLength % 2) {
                bytesArraysSizes.incomingMessageVoiceDataLength += 1;
                extraByte = null;
            } else {
                extraByte = data[bytesArraysSizes.incomingMessageVoiceDataLength - 1];
                bytesArraysSizes.sourceLen -= 1;
            }
        }
    };

    const finishPlayback = () => {
        soundBuffer = null;
        if (audioContextForPlayback) {
            audioContextForPlayback.close();
        }

        audioContextForPlayback = null;
        audioSlices = [];
    };

    const streamToDataToPlayer = (data: Uint8Array) => {
        let slicePoint = 0;
        if (audioSlices.length === 0) {
            audioContextForPlayback = new AudioContext();
            soundBuffer = createSoundBuffer(audioContextForPlayback, 24000, finishPlayback, 1000, START_VOICE_DELAY);
            slicePoint = 44;
        }

        const bytesArraysSizes: BytesArraysSizes = {
            incomingMessageVoiceDataLength: data.length,
            sourceLen: data.length,
            start: 0,
            prepend: null,
        };

        getExtraBytes(data, bytesArraysSizes);

        const dataBuffer = new ArrayBuffer(bytesArraysSizes.incomingMessageVoiceDataLength);

        const bufferUi8 = new Uint8Array(dataBuffer);
        const bufferI16 = new Int16Array(dataBuffer);

        bufferUi8.set(data.slice(0, bytesArraysSizes.sourceLen), bytesArraysSizes.start);
        if (bytesArraysSizes.prepend != null) {
            bufferUi8[0] = bytesArraysSizes.prepend;
        }
        soundBuffer?.write(from16BitToFloat32(bufferI16.slice(slicePoint)));
        audioSlices.push(bufferUi8);
    };

    return {
        streamToDataToPlayer,
    };
};

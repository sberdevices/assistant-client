/** Генерирует wav c тишиной, заданной продолжительности */
export const generateSilence = (seconds = 1) => {
    const sampleRate = 8000;
    const numChannels = 1;
    const bitsPerSample = 8;

    const blockAlign = (numChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = Math.ceil(seconds * sampleRate) * blockAlign;
    const chunkSize = 36 + dataSize;
    const byteLength = 8 + chunkSize;

    const buffer = new ArrayBuffer(byteLength);
    const view = new DataView(buffer);

    view.setUint32(0, 0x52494646, false); // Chunk ID 'RIFF'
    view.setUint32(4, chunkSize, true); // File size
    view.setUint32(8, 0x57415645, false); // Format 'WAVE'
    view.setUint32(12, 0x666d7420, false); // Sub-chunk 1 ID 'fmt '
    view.setUint32(16, 16, true); // Sub-chunk 1 size
    view.setUint16(20, 1, true); // Audio format
    view.setUint16(22, numChannels, true); // Number of channels
    view.setUint32(24, sampleRate, true); // Sample rate
    view.setUint32(28, byteRate, true); // Byte rate
    view.setUint16(32, blockAlign, true); // Block align
    view.setUint16(34, bitsPerSample, true); // Bits per sample
    view.setUint32(36, 0x64617461, false); // Sub-chunk 2 ID 'data'
    view.setUint32(40, dataSize, true); // Sub-chunk 2 size

    for (let offset = 44; offset < byteLength; offset++) {
        view.setUint8(offset, 128);
    }

    return view.buffer;
};

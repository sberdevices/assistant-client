import { AssistantWindow } from './src/typings';

export declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window extends AssistantWindow {}

    interface Window {
        webkitAudioContext?: new () => AudioContext;
    }
}

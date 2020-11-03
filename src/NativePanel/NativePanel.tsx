/* stylelint-disable */
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import { createAudioRecorder } from '../createAudioRecorder';
import { SuggestionButtonType } from '../typings';

import assistantSphereIcon from './sphere.png';

import './styles.css';

export interface NativePanelParams {
    defaultText: string;
    render?: (props: NativePanelProps) => void;
    tabIndex?: number;
}

interface NativePanelProps extends NativePanelParams {
    createVoiceStream: () => {
        write: (data: ArrayBuffer, last?: boolean) => void;
        on: <K extends 'stt'>(event: K, cb: (text: string, last?: boolean) => void) => void;
    };
    defaultText: string;
    sendText: (text: string) => void;
    className?: string;
    tabIndex?: number;
    suggestions: SuggestionButtonType[];
    bubbleText: string;
}

export const NativePanel: React.FC<NativePanelProps> = ({
    defaultText,
    sendText,
    className,
    tabIndex,
    createVoiceStream,
    suggestions,
    bubbleText,
}) => {
    const [value, setValue] = useState(defaultText);
    const [recording, setRecording] = useState(false);
    const [bubble, setBubble] = useState(bubbleText);
    const [prevBubbleText, setPrevBubbleText] = useState(bubbleText);

    if (bubbleText !== prevBubbleText) {
        setPrevBubbleText(bubbleText);
        setBubble(bubbleText);
    }

    const handleSphereClick = () => {
        setValue('');
        setRecording(!recording);
    };

    const createSuggestClickHandler = (suggest: SuggestionButtonType) => () => {
        const { action } = suggest;

        if (action.type === 'text' && action.text != null) {
            sendText(action.text);
        }
    };

    useEffect(() => {
        if (recording) {
            let outerAudioRecorder: ReturnType<typeof createAudioRecorder> | null = null;
            let outerStream: MediaStream | null = null;
            let finished = false;

            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                })
                .then((stream) => {
                    outerStream = stream;
                    const audioRecorder = createAudioRecorder(stream);
                    outerAudioRecorder = audioRecorder;

                    const voiceStream = createVoiceStream();

                    audioRecorder.start();
                    audioRecorder.on('data', (chunk, last) => {
                        if (!finished) {
                            voiceStream.write(new Uint8Array(chunk), last);
                        }
                    });

                    voiceStream.on('stt', (text: string, last?: boolean) => {
                        if (last) {
                            finished = true;
                            setRecording(false);
                            setValue('');
                        } else {
                            setValue(text);
                        }
                    });
                });

            return () => {
                outerAudioRecorder?.stop();

                if (outerStream) {
                    outerStream.getTracks().forEach((track) => track.stop());
                }
            };
        }

        return undefined;
    }, [createVoiceStream, recording, sendText]);

    return (
        <div className={className ? `nativePanel ${className}` : 'nativePanel'}>
            {bubble && (
                <div className="bubble" onClick={() => setBubble('')}>
                    {bubble}
                </div>
            )}

            <div
                className={recording ? 'sphere active' : 'sphere'}
                onClick={() => {
                    if (!recording) {
                        handleSphereClick();
                    }
                }}
                style={{
                    backgroundImage: `url(${assistantSphereIcon})`,
                }}
            />

            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="voice" className="label">
                Попробуйте
            </label>

            <input
                id="voice"
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
                tabIndex={typeof tabIndex === 'number' && Number.isInteger(tabIndex) ? tabIndex : -1}
                disabled={recording}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendText(value);
                        setValue('');
                    }
                }}
                className="input"
            />
            <div className="suggestPanel">
                {suggestions.map((s) => (
                    <div key={`suggest-${s.title}`} onClick={createSuggestClickHandler(s)} className="suggest">
                        {s.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

let div: HTMLDivElement | void;

export const renderNativePanel = (props: NativePanelProps) => {
    if (!div) {
        div = document.createElement('div');
        document.body.appendChild(div);
    }

    render(<NativePanel {...props} />, div);
};

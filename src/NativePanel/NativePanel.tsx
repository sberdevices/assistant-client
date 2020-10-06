/* stylelint-disable */
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { render } from 'react-dom';

import { createAudioRecorder } from '../createAudioRecorder';
import { SuggestionButtonType } from '../typings';

import assistantSphereIcon from './sphere.png';

const StyledNativePanel = styled.div`
    background-color: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(5px);

    box-sizing: border-box;

    display: flex;
    align-items: center;

    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 144px;

    padding: 36px 128px;

    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
`;

const StyledLabel = styled.label`
    font-size: 36px;
    line-height: 42px;
    font-weight: 500;
    color: #fff;

    opacity: 0.5;

    padding-left: 40px;
    padding-right: 10px;
`;

const StyledInput = styled.input`
    font-size: 36px;
    line-height: 42px;
    font-weight: 500;
    color: #fff;

    height: 42px;

    padding: 0;
    margin: 0;

    outline: none;
    border: 0;
    background: transparent;
`;

interface StyledAssistantSphereIconProps {
    recording: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledAssistantSphereIcon = styled.div<StyledAssistantSphereIconProps>`
    background-image: url(${assistantSphereIcon});
    background-size: contain;
    width: 72px;
    height: 72px;

    transition: transform 0.2s;
    :hover {
        transform: scale(1.1);
    }

    ${(props) =>
        props.recording &&
        css`
            animation: ${rotate} 2s linear infinite;
        `}
`;

const StyledSuggestionsPanel = styled.div`
    position: absolute;
    top: 15px;
    right: 25px;

    display: flex;
    flex-direction: row;
    height: 28px;
`;

const StyledSuggest = styled.div`
    line-height: 26px;
    padding: 0 15px;
    margin-left: 5px;

    border: 1px solid #c4c4c4;
    border-radius: 16px;

    color: #fff;
    cursor: pointer;
    font-size: 14px;
`;

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
}

export const NativePanel: React.FC<NativePanelProps> = ({
    defaultText,
    sendText,
    className,
    tabIndex,
    createVoiceStream,
    suggestions,
}) => {
    const [value, setValue] = useState(defaultText);
    const [recording, setRecording] = useState(false);

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
        <StyledNativePanel className={className}>
            <StyledAssistantSphereIcon
                recording={recording}
                onClick={() => {
                    if (!recording) {
                        handleSphereClick();
                    }
                }}
            />

            <StyledLabel htmlFor="voice">Попробуйте</StyledLabel>

            <StyledInput
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
            />
            <StyledSuggestionsPanel>
                {suggestions.map((s) => (
                    <StyledSuggest key={`suggest-${s.title}`} onClick={createSuggestClickHandler(s)}>
                        {s.title}
                    </StyledSuggest>
                ))}
            </StyledSuggestionsPanel>
        </StyledNativePanel>
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

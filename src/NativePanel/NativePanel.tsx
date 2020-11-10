/* stylelint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';

import { SuggestionButtonType } from '../typings';

import assistantSphereIcon from './sphere.png';

import './styles.css';

export interface NativePanelParams {
    defaultText: string;
    render?: (props: NativePanelProps) => void;
    tabIndex?: number;
}

interface NativePanelProps extends NativePanelParams {
    defaultText: string;
    sendText: (text: string) => void;
    className?: string;
    tabIndex?: number;
    suggestions: SuggestionButtonType[];
    bubbleText: string;
    onListen: () => void;
    onSubscribeListenStatus: (cb: (type: 'listen' | 'stopped') => void) => () => void;
    onSubscribeHypotesis: (cb: (hypotesis: string, last: boolean) => void) => () => void;
}

export const NativePanel: React.FC<NativePanelProps> = ({
    defaultText,
    sendText,
    className,
    tabIndex,
    suggestions,
    bubbleText,
    onListen,
    onSubscribeListenStatus,
    onSubscribeHypotesis,
}) => {
    const [value, setValue] = useState(defaultText);
    const [recording, setRecording] = useState(false);
    const [bubble, setBubble] = useState(bubbleText);
    const [prevBubbleText, setPrevBubbleText] = useState(bubbleText);

    if (bubbleText !== prevBubbleText) {
        setPrevBubbleText(bubbleText);
        setBubble(bubbleText);
    }

    const handleSphereClick = useCallback(() => {
        setValue('');
        onListen();
    }, [onListen]);

    const createSuggestClickHandler = (suggest: SuggestionButtonType) => () => {
        const { action } = suggest;

        if ('text' in action) {
            sendText(action.text);
        }
    };

    useEffect(() => {
        const unsubscribeStatus = onSubscribeListenStatus((type: 'listen' | 'stopped') => {
            setRecording(type === 'listen');
        });

        const unsubscribeHypotesis = onSubscribeHypotesis((hypotesis: string, last: boolean) => {
            setValue(last ? '' : hypotesis);
        });

        return () => {
            unsubscribeStatus();
            unsubscribeHypotesis();
        };
    }, [onSubscribeListenStatus, onSubscribeHypotesis]);

    return (
        <div className={className ? `nativePanel ${className}` : 'nativePanel'}>
            {bubble && (
                <div className="bubble" onClick={() => setBubble('')}>
                    {bubble}
                </div>
            )}

            <div
                className={recording ? 'sphere active' : 'sphere'}
                onClick={handleSphereClick}
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

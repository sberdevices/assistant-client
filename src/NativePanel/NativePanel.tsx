/* stylelint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';

import { Action, Suggestions, TextAction } from '../typings';

import { Bubble } from './components/Bubble';
import { CarouselTouch } from './components/CarouselTouch';
import { KeyboardTouch } from './components/KeyboardTouch';
import { VoiceTouch } from './components/VoiceTouch';
import { SphereButton } from './components/SphereButton';
import { TextInput } from './components/TextInput';
import { Suggests } from './components/Suggests';
import { styles } from './styles';

export interface NativePanelParams {
    defaultText?: string;
    render?: (props: NativePanelProps) => void;
    tabIndex?: number;
    screenshotMode?: boolean;
}

export interface NativePanelProps extends NativePanelParams {
    defaultText?: string;
    sendServerAction: (action: Record<string, unknown>) => void;
    sendText: (text: string) => void;
    className?: string;
    tabIndex?: number;
    suggestions: Suggestions['buttons'];
    bubbleText: string;
    onListen: () => void;
    onSubscribeListenStatus: (cb: (type: 'listen' | 'stopped') => void) => () => void;
    onSubscribeHypotesis: (cb: (hypotesis: string, last: boolean) => void) => () => void;
}

export const NativePanel: React.FC<NativePanelProps> = ({
    defaultText = 'Покажи что-нибудь',
    sendServerAction,
    sendText,
    className,
    tabIndex,
    suggestions,
    bubbleText,
    onListen,
    onSubscribeListenStatus,
    onSubscribeHypotesis,
    screenshotMode = false,
}) => {
    const [value, setValue] = useState(defaultText);
    const [recording, setRecording] = useState(false);
    const [bubble, setBubble] = useState(bubbleText);
    const [prevBubbleText, setPrevBubbleText] = useState(bubbleText);
    const [inputType, setInputType] = useState<'text-input' | 'voice-input'>('voice-input');

    if (bubbleText !== prevBubbleText) {
        setPrevBubbleText(bubbleText);
        setBubble(bubbleText);
    }

    const handleClearBubbleText = () => {
        setBubble('');
    };

    const handleListen = useCallback(() => {
        setValue('');
        onListen();
    }, [onListen]);

    const handleToggleInputType = () => {
        // eslint-disable-next-line prettier/prettier
        setInputType((type) => (type === 'voice-input' ? 'text-input' : 'voice-input'));
    };

    const handleAction = (action: Action) => {
        if (typeof action.text !== 'undefined') {
            sendText((action as TextAction).text);
        } else if (action.type === 'deep_link') {
            window.open(action.deep_link, '_blank');
        } else if (action.type === 'server_action') {
            sendServerAction(action.server_action);
        } else {
            // eslint-disable-next-line no-console
            console.error('Unsupported action', action);
        }
    };

    const handlerEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendText(value);
            setValue('');
        }
    };

    const createSuggestHandler = (suggest: Suggestions['buttons'][0]) => () => {
        const { action, actions } = suggest;

        if (action) {
            handleAction(action);
        }

        if (actions) {
            actions.forEach(handleAction);
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

    useEffect(() => {
        const style = document?.createElement('style');
        style.appendChild(document?.createTextNode(styles));
        document?.getElementsByTagName('head')[0].appendChild(style);
    }, []);

    return (
        // eslint-disable-next-line prettier/prettier
        <div
            className={`NativePanel ${inputType} ${suggestions.length ? 'has-suggestions' : ''} ${
                screenshotMode ? 'production-mode' : ''
            } ${className ?? ''}`}
        >
            <Bubble text={bubble} onClick={handleClearBubbleText} />

            <CarouselTouch />

            <div className="NativePanel__sphere">
                <SphereButton onClick={handleListen} recording={recording} />
            </div>

            <div className="NativePanel__textInputs">
                <Suggests suggests={suggestions} onClickHandlerCreator={createSuggestHandler} />
                <TextInput
                    value={value}
                    tabIndex={typeof tabIndex === 'number' && Number.isInteger(tabIndex) ? tabIndex : -1}
                    disabled={recording}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                    onKeyDown={handlerEnter}
                />
            </div>

            <div className="NativePanel__touch">
                <KeyboardTouch onClick={handleToggleInputType} />
                <VoiceTouch onClick={handleToggleInputType} />
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

    if (props.hideNativePanel) {
        render(<></>, div);
    } else {
        render(<NativePanel {...props} />, div);
    }
};

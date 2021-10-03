import React from 'react';

import { fontFamily400 } from '../fonts';
import { Suggestions } from '../../typings';
import { NativePanelProps } from '../NativePanel';

export const SuggestsStyles = `
.Suggests {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
}

.Suggests > *:last-child {
    margin-right: 0;
}

.SuggestsSuggest {
    border-radius: 500px;
    color: #fff;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
    ${fontFamily400}
}
`;

export const SuggestLGStyles = `
    font-size: 24px;
    padding: 12px 24px;
    margin-right: 18px;
`;

export const SuggestMDStyles = `
    font-size: 14px;
    padding: 8px 12px;
    margin-right: 12px;
`;

export const SuggestSMStyles = `
    font-size: 12px;
    padding: 9px 12px;
    margin-right: 12px;
`;

export const SuggestOutlinedStyles = `
    border: 1px solid rgba(255, 255, 255, 0.28);
`;

export const SuggestFilledStyles = `
    background-color: rgba(255, 255, 255, 0.12);
    border: 1px solid transparent;
`;

export const Suggests: React.FC<{
    suggests: NativePanelProps['suggestions'];
    onClickHandlerCreator: (suggest: NativePanelProps['suggestions'][0]) => () => void;
}> = ({ suggests = [], onClickHandlerCreator }) => {
    if (!suggests.length) {
        return null;
    }

    return (
        <div className="Suggests">
            {suggests.map((s: Suggestions['buttons'][0]) => (
                <div key={`suggest-${s.title}`} onClick={onClickHandlerCreator(s)} className="SuggestsSuggest">
                    {s.title}
                </div>
            ))}
        </div>
    );
};

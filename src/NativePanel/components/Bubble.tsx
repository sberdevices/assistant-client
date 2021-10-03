import React from 'react';

import { fontFamily500 } from '../fonts';

export const BubbleStyles = `
.Bubble {
    position: absolute;
    top: -13px;
    cursor: pointer;
    transform: translateY(-100%);
    max-width: 80%;
    border-radius: 24px 24px 24px 6px;
    background-color: rgba(255, 255, 255, 0.08);
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    z-index: -1;
    ${fontFamily500}
}
.Bubble:empty {
    display: none;
}
`;

export const BubbleMDStyles = `
    font-size: 16px;
    padding: 12px 24px;
`;

export const BubbleSMStyles = `
    font-size: 12px;
    padding: 8px 12px;
`;

export const Bubble: React.FC<{
    text: string;
    onClick: () => void;
}> = ({ text, onClick }) => {
    return (
        <div className="Bubble" onClick={onClick}>
            {text}
        </div>
    );
};

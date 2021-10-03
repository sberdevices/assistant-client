import React from 'react';

import { fontFamily400 } from '../fonts';

export const TextInputStyles = `
.TextInput {
    width: 100%;
    color: #fff;
    line-height: 18px;
    font-weight: 500;
    border: 0;
    ${fontFamily400}
}
`;

export const TextInputPureStyles = `
    font-size: 22px;
    outline: none;
    background: transparent;
`;

export const TextInputFilledStyles = `
    height: 38px;
    font-size: 16px;
    background: rgb(144, 144, 144, 0.15);
    border-radius: 500px;
    padding: 8px 16px;
    box-sizing: border-box;
`;

export const TextInput: React.FC<{
    value: string;
    tabIndex: number;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ value, tabIndex, disabled, onChange, onKeyDown }) => {
    return (
        <input
            id="voice"
            className="TextInput"
            value={value}
            tabIndex={tabIndex}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

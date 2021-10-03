import React from 'react';

const voiceIcon =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03IDEyYzEuNjYgMCAzLTEuMzQgMy0zVjNjMC0xLjY2LTEuMzQtMy0zLTNTNCAxLjM0IDQgM3Y2YzAgMS42NiAxLjM0IDMgMyAzWm01LjkxLTNjLS40OSAwLS45LjM2LS45OC44NUMxMS41MiAxMi4yIDkuNDcgMTQgNyAxNGMtMi40NyAwLTQuNTItMS44LTQuOTMtNC4xNUEuOTk4Ljk5OCAwIDAgMCAxLjA5IDljLS42MSAwLTEuMDkuNTQtMSAxLjE0LjQ5IDMgMi44OSA1LjM1IDUuOTEgNS43OFYxOGMwIC41NS40NSAxIDEgMXMxLS40NSAxLTF2LTIuMDhhNi45OTMgNi45OTMgMCAwIDAgNS45MS01Ljc4Yy4xLS42LS4zOS0xLjE0LTEtMS4xNFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';

export const VoiceTouchStyles = `
.VoiceTouch {
    height: 38px;
    width: 38px;
    border-radius: 500px;
    background-color: #24B23E;
    background-size: 14px 19px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${voiceIcon});
}
`;

export const VoiceTouch: React.FC<{
    onClick: () => void;
}> = ({ onClick }) => {
    return <div className="VoiceTouch" onClick={onClick} />;
};

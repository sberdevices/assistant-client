export const NativePanelStyles = `
.NativePanel {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    backdrop-filter: blur(5px);
    background: linear-gradient(#ffffff00, #000000);
}

.NativePanel__sphere {
    display: inline-block;
}
.NativePanel__textInputs {}
.NativePanel__touch {
    display: inline-block;
    margin-left: 16px;
}
.NativePanel__touch .VoiceTouch {
    display: none;
}
`;

export const NativePanelPaddingsSMStyles = `
.NativePanel {
    height: 64px;
    padding: 8px 20px;
}

.NativePanel .Suggests {
    padding-left: 20px;
    margin-left: -20px;
    margin-right: -20px;
}
`;

export const NativePanelPaddingsMDStyles = `
.NativePanel {
    padding: 28px 12px 12px;
}

.NativePanel .Suggests {
    margin-right: -12px;
}
`;

export const NativePanelPaddingsLGStyles = `
.NativePanel {
    padding: 36px 64px 24px;
}

.NativePanel .Suggests {
    margin-right: -64px;
}
`;

export const NativePanelInputOffsetMDStyles = `
.NativePanel__textInputs {
    margin-left: 24px;
}
`;

export const NativePanelInputOffsetLGStyles = `
.NativePanel__textInputs {
    margin-left: 38px;
}
`;

// touch
const NativePanelTouchVoiceInputStyles = `
.NativePanel.voice-input .CarouselTouch {
    display: block;
    position: absolute;
    left: 23px;
    top: 50%;
    transform: translateY(-50%);
}
.NativePanel.voice-input .NativePanel__sphere {
    margin: 0 auto;
}

.NativePanel.voice-input .NativePanel__textInputs {
    position: absolute;
    top: -6px;
    left: 20px;
    right: 20px;
    transform: translateY(-100%);
}

.NativePanel.voice-input .NativePanel__textInputs .TextInput {
    display: none;
}

.NativePanel.voice-input .NativePanel__touch {
    position: absolute;
    right: 23px;
    top: 50%;
    transform: translateY(-50%);
}
`;

const NativePanelTouchTextInputStyles = `
.NativePanel.text-input .NativePanel__textInputs {
    width: 100%;
}
.NativePanel.text-input .NativePanel__textInputs .Suggests {
    width: auto;
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    transform: translateY(-100%);
}
.NativePanel.text-input .NativePanel__sphere {
    display: none;
}
.NativePanel.text-input .NativePanel__touch .KeyboardTouch {
    display: none;
}
.NativePanel.text-input .NativePanel__touch .VoiceTouch {
    display: block;
}
`;

export const NativePanelTouchStyles = `
${NativePanelTouchVoiceInputStyles}
${NativePanelTouchTextInputStyles}

.NativePanel.production-mode .Bubble {
    display: none;
}

.NativePanel.has-suggestions.voice-input .Bubble {
    top: -54px;
}

.NativePanel.has-suggestions.text-input .Bubble {
    top: -46px;
}
`;

// desktop
const NativePanelDesktopNotscreenshotModeStyles = `
.NativePanel:not(.production-mode) .NativePanel__textInputs {
    position: relative;
    width: 100%;
}

.NativePanel:not(.production-mode) .NativePanel__textInputs .Suggests {
    position: absolute;
    top: -13px;
    left: 0;
    right: 0;
    transform: translateY(-100%);
}
`;

const NativePanelDesktopscreenshotModeStyles = `
.NativePanel.production-mode .NativePanel__textInputs .TextInput,
.NativePanel.production-mode .Bubble {
    display: none;
}
`;

export const NativePanelDesktopBubblePositionLG = `
.NativePanel.has-suggestions:not(.production-mode) .Bubble {
    top: -33px;
}
`;

export const NativePanelDesktopBubblePositionMD = `
.NativePanel.has-suggestions:not(.production-mode) .Bubble {
    top: -26px;
}
`;

export const NativePanelDesktopStyles = `
${NativePanelDesktopNotscreenshotModeStyles}
${NativePanelDesktopscreenshotModeStyles}

.NativePanel__sphere {
    display: inline-block;
}

.NativePanel__touch {
    display: none;
}

.NativePanel:not(.has-suggestions) .Bubble,
.NativePanel:not(.has-suggestions):not(.production-mode) .Bubble {
    top: 12px
}
`;

export const createWatchdog = ({ onReset, timeout = 600 }: { onReset: () => void; timeout?: number }) => {
    let timer = 0;
    const tick = (tm = timeout) => {
        clearTimeout(timer);
        timer = window.setTimeout(onReset, tm);
    };

    return {
        deactivate: () => {
            clearTimeout(timer);
        },
        tick,
    };
};

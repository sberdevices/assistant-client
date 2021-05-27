const KEY = 'SALUTE_HAD_FIRST_SESSION';

export const checkHadFirstSession = () => {
    try {
        return localStorage.getItem(KEY) === 'true';
    } catch {
        return false;
    }
};

export const setHadFirstSession = () => {
    try {
        localStorage.setItem(KEY, 'true');
        // eslint-disable-next-line no-empty
    } catch {}
};

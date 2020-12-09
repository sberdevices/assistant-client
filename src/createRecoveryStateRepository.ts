const prefix = 'recovery_';

export const createRecoveryStateRepository = () => {
    const get = (key: string): any => {
        const value = localStorage.getItem(`${prefix}${key}`);

        return value ? JSON.parse(value) : null;
    };
    const set = (key: string, state: any) => {
        state && localStorage.setItem(`${prefix}${key}`, JSON.stringify(state));
    };
    const remove = (key: string) => {
        localStorage.removeItem(`${prefix}${key}`);
    };

    return { get, set, remove };
};

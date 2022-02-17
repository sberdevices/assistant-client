import { useCallback, useEffect } from 'react';

export const useEventsAdapter = () => {
    const handleKeydown = useCallback(({ code, target }: KeyboardEvent) => {
        switch (code) {
            case 'Enter':
                if ((target as HTMLElement).tagName === 'BUTTON') {
                    break;
                }

                (target as HTMLElement).click();
                break;

            case 'Escape':
                window.history.back();
                break;

            default:
                break;
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);
};

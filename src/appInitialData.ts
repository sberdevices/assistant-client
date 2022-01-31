import { AssistantClientCommand, AssistantClientCustomizedCommand, AssistantSmartAppCommand } from './typings';

const findCommandIndex = (arr: AssistantClientCommand[], command: AssistantClientCommand) => {
    let index = -1;

    if (command.type === 'character') {
        index = arr.findIndex((c) => c.type === 'character' && c.character.id === command.character.id);
    } else if (command.type === 'insets') {
        index = arr.findIndex((c) => c.type === 'insets');
    } else if (command.type === 'app_context') {
        index = arr.findIndex((c) => c.type === 'app_context');
    } else if (command.sdk_meta && command.sdk_meta?.mid && command.sdk_meta?.mid !== '-1') {
        index = arr.findIndex((c) => c.sdk_meta?.mid === command.sdk_meta?.mid);
    }

    return index;
};

export const appInitialData = (() => {
    let isPulled = false;
    let pulled: Array<AssistantClientCommand> = [];
    let committed: Array<AssistantClientCommand> = [];
    let diff: Array<AssistantClientCommand> = [];

    const isCommandWasPulled = (command: AssistantClientCommand) => findCommandIndex(pulled, command) >= 0;

    return {
        /**
         * Прочитать appInitialData
         * @returns Массив комманд
         */
        pull: () => {
            isPulled = true;
            pulled = [...(window.appInitialData || [])];
            return [...pulled];
        },
        /**
         * Зафиксировать текущее состояние appInitialData
         */
        commit: () => {
            committed = [...(window.appInitialData || [])];
            diff =
                isPulled === true
                    ? (window.appInitialData || []).filter((c) => !isCommandWasPulled(c))
                    : [...(window.appInitialData || [])];
        },
        /**
         * Возвращает диф appInitialData между pull и commit
         * @returns Массив комманд
         */
        diff: () => {
            return [...diff];
        },
        /**
         * Возвращает флаг наличия command в appInitialData на момент commit
         * @param command Команда, которую нужно проверить на наличие в appInitialData
         * @returns true - если команда была в appInitialData
         */
        isCommitted: (command: AssistantClientCommand) => {
            const commandIndex = findCommandIndex(committed, command);
            const isCommitted = commandIndex >= 0;
            if (isCommitted) {
                committed.splice(commandIndex, 1);
            }

            return isCommitted;
        },
        /**
         * Возвращает первое сообщение из appInitialData, подходящее под фильтры param
         * @param param Параметры: тип сообщения (например, smart_app_data)
         * и тип команды (значение поля smart_app_data.type)
         * @returns Первое сообщение, соответствующее параметрам или undefined
         */
        find: <T>({ type, command }: { type?: string; command?: string }): T | undefined => {
            const data = [...(window.appInitialData || [])];
            const result = data.find((data) => {
                if (!command && type && type === data.type) {
                    return true;
                }
                const isCommandInSmartAppData = command && 'smart_app_data' in data;
                if (!isCommandInSmartAppData) {
                    return;
                }
                if (
                    command === ((data.smart_app_data as unknown) as { command: string }).command ||
                    command === (data.smart_app_data as AssistantSmartAppCommand['smart_app_data']).type
                ) {
                    return true;
                }
                return false;
            }) as AssistantClientCustomizedCommand<AssistantSmartAppCommand>;
            return ((result && 'smart_app_data' in result ? result.smart_app_data : result) as unknown) as T;
        },
    };
})();

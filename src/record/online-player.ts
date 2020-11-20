import { AssistantRecord } from '../typings';

import { CURRENT_VERSION } from './index';

export const createOnlineRecordPlayer = (record?: AssistantRecord, { context = window } = {}) => {
    let currentRecord = record;
    let entryCursor = 0;

    const playServerAction = (action: unknown, message: string) => {
        /// WARNING: requestId не поддерживается
        // eslint-disable-next-line @typescript-eslint/camelcase
        window.AssistantHost?.sendDataContainer(JSON.stringify({ action, message_name: message }));
    };

    const playTextAction = (text: string) => {
        if (!text.length) {
            return;
        }

        // eslint-disable-next-line no-underscore-dangle
        context.__dangerouslySendTextMessage && context.__dangerouslySendTextMessage(text);
    };

    const playNext = () => {
        if (!currentRecord || entryCursor + 1 >= currentRecord.entries.length) {
            return false;
        }

        let entry = currentRecord.entries[entryCursor++];
        while (
            entry.type !== 'outcoming' ||
            ((entry.message == null ||
                entry.message.data?.server_action == null ||
                entry.message.name === 'OPEN_ASSISTANT') &&
                entry.text == null &&
                entryCursor < currentRecord.entries.length)
        ) {
            entry = currentRecord.entries[entryCursor++];
        }

        if (entry.type === 'outcoming' && entryCursor < currentRecord.entries.length) {
            entry.message && playServerAction(entry.message.data.server_action, entry.message.name);
            entry.text && playTextAction(entry.text.data || '');
        }

        return currentRecord.entries.some(
            (e, i) => i >= entryCursor && e.type === 'outcoming' && e.message?.data != null,
        );
    };

    const play = () => {
        if (!currentRecord) {
            return;
        }

        let end = false;
        while (!end) {
            end = !playNext();
        }
    };

    const setRecord = (rec: AssistantRecord) => {
        if (rec.version !== CURRENT_VERSION) {
            throw new Error('Unsupported log version');
        }
        currentRecord = rec;
        entryCursor = 0;
    };

    return {
        continue: playNext,
        play,
        setRecord,
    };
};

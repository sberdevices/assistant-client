import { AssistantRecord, SystemMessageDataType, RecordPlayer } from '../typings';

const CURRENT_VERSION = '0.1.0';

export const createRecordOfflinePlayer = (record?: AssistantRecord, context = window): RecordPlayer => {
    let currentRecord = record;
    let entryCursor = 0;

    const playMessage = (message: SystemMessageDataType) => {
        for (const item of message.items) {
            if (item.command) {
                context.AssistantClient?.onData && context.AssistantClient.onData(item.command);
            }
        }
    };

    const playNext = () => {
        if (!currentRecord || entryCursor + 1 >= currentRecord.entries.length) {
            return false;
        }

        let entry = currentRecord.entries[entryCursor++];
        while ((entry.type !== 'incoming' || entry.message == null) && entryCursor < currentRecord.entries.length) {
            entry = currentRecord.entries[entryCursor++];
        }
        if (entry.type === 'incoming') {
            entry.message && playMessage(entry.message.data);
        }

        return currentRecord.entries.some(
            (e, i) => i > entryCursor && e.type === 'incoming' && e.message?.data != null,
        );
    };

    const play = () => {
        context.AssistantClient?.onStart && context.AssistantClient.onStart();
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

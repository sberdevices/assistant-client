/* eslint-disable @typescript-eslint/camelcase */
import {
    AssistantRecord,
    SystemMessageDataType,
    AssistantClientCommand,
    OutcomingMessage,
    MessageNames,
    AssistantSmartAppCommand,
} from '../typings';

import { CURRENT_VERSION } from './index';

export const createRecordOfflinePlayer = (
    record?: AssistantRecord,
    { context = window }: { context?: Window } = {},
) => {
    let currentRecord = record;
    let entryCursor = 0;

    const playMessage = (message: SystemMessageDataType, onPlay?: (command: AssistantClientCommand) => void) => {
        for (const item of message.items || []) {
            if (item.command) {
                const command: AssistantClientCommand = { ...(item.command as AssistantSmartAppCommand) };

                onPlay ? onPlay(command) : context.AssistantClient?.onData && context.AssistantClient.onData(command);
            }
        }
    };

    const playNext = (onPlay?: (command: AssistantClientCommand) => void) => {
        if (!currentRecord || entryCursor + 1 >= currentRecord.entries.length) {
            return false;
        }

        let entry = currentRecord.entries[entryCursor++];
        while (
            (entry.type !== 'incoming' ||
                entry.message?.data == null ||
                entry.message.name !== MessageNames.ANSWER_TO_USER ||
                !(entry.message.data.items || []).some(({ command }) => command != null)) &&
            entryCursor < currentRecord.entries.length
        ) {
            entry = currentRecord.entries[entryCursor++];
        }
        if (entry.type === 'incoming' && entryCursor <= currentRecord.entries.length) {
            entry.message && playMessage(entry.message.data, onPlay);
        }

        return currentRecord.entries.some(
            (e, i) =>
                i >= entryCursor &&
                e.type === 'incoming' &&
                e.message?.data != null &&
                e.message.name === MessageNames.ANSWER_TO_USER &&
                (e.message.data.items || []).some(({ command }) => command != null),
        );
    };

    const play = (onPlay?: (command: AssistantClientCommand) => void) => {
        context.AssistantClient?.onStart && context.AssistantClient.onStart();
        if (!currentRecord) {
            return;
        }

        let end = false;
        while (!end) {
            end = !playNext(onPlay);
        }
    };

    const getNextAction = () => {
        if (!currentRecord || entryCursor + 1 >= currentRecord.entries.length) {
            return undefined;
        }

        let cursor = entryCursor;
        let entry = currentRecord.entries[cursor++];
        while (
            entry.type === 'outcoming' &&
            entry.message?.data?.systemMessage?.data == null &&
            cursor < currentRecord.entries.length
        ) {
            entry = currentRecord.entries[cursor++];
        }

        if (cursor >= currentRecord.entries.length) {
            return undefined;
        }

        return {
            action: (entry as OutcomingMessage).message?.data.server_action,
            name: entry.message?.name,
            requestId: entry.message?.data.sdk_meta?.requestId,
        };
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
        getNextAction,
        setRecord,
    };
};

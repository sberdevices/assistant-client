import { RecordSaver } from '../typings';

export const createRecordDownloader = (): RecordSaver => {
    return {
        save: (record: object) => {
            const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(record))}`;
            const anchor = document.createElement('a');
            anchor.setAttribute('href', dataStr);
            anchor.setAttribute('download', 'assistant-log.json');
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
        },
    };
};

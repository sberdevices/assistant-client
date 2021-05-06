import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import { AssistantRecord, LogRecorder, RecordSaver } from '../typings';

export const CURRENT_VERSION = '0.1.0';

const RecordPanelStyles = `
.recordPanel {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
}

.recordButton {
    margin-right: 8px;
    margin-top: 8px;
}
`;

interface AssistantRecordPanelProps {
    recorder: LogRecorder;
    onSave: (record: AssistantRecord) => void;
}

const AssistantRecordPanel: React.FC<AssistantRecordPanelProps> = ({ recorder, onSave }: AssistantRecordPanelProps) => {
    const [isRecording, setIsRecording] = useState(true);
    const [record, setRecord] = useState<AssistantRecord>();
    const recorderRef = useRef<LogRecorder>();

    const handleStart = React.useCallback(() => {
        recorderRef.current?.start();
        setIsRecording(true);
        setRecord(undefined);
    }, []);

    const handleStop = React.useCallback(() => {
        recorderRef.current?.stop();
        setIsRecording(false);

        setRecord(recorderRef.current?.getRecord());
    }, []);

    const handleSave = React.useCallback(() => {
        if (record) {
            onSave(record);
        }
    }, [onSave, record]);

    useEffect(() => {
        recorderRef.current?.stop();
        recorderRef.current = recorder;
    }, [recorder]);

    useEffect(() => {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(RecordPanelStyles));
        document.getElementsByTagName('head')[0].appendChild(style);
    }, []);

    return (
        <div className="recordPanel">
            <button onClick={handleStart} type="button" disabled={isRecording} className="recordButton">
                start
            </button>
            <button onClick={handleStop} type="button" disabled={!isRecording} className="recordButton">
                stop
            </button>
            <button onClick={handleSave} type="button" disabled={record == null} className="recordButton">
                save
            </button>
        </div>
    );
};

export const renderAssistantRecordPanel = (recorder: LogRecorder, saver: RecordSaver) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    render(<AssistantRecordPanel recorder={recorder} onSave={saver.save} />, div);
};

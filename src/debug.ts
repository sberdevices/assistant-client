/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { v4 } from 'uuid';

import { DPMessage, AssistantAppState, AssistantAction, AssistantServerAction, AssistantCharacterCommand, AssistantNavigationCommand, AssistantSmartAppCommand } from './typings';

const STATE_UPDATE_TIMEOUT = 200;

interface AppMessage {
    name?: string;
    data?: string;
    text?: string;
}

interface CreateMessageProps extends AppMessage {
    name?: string;
    data?: string;
    text?: string;
    state: AssistantAppState;
    applicationId: string;
    appVersionId: string;
    sessionId: string;
    userId: string;
    config: IntitializeProps;
}

const createMessage = (props: CreateMessageProps): DPMessage => {
    const messageName: DPMessage['messageName'] = props.data ? 'SERVER_ACTION' : props.name || 'MESSAGE_TO_SKILL';

    const systemMessage = props.data
        ? {
              systemMessage: {
                  data: {
                      app_info: {},
                      server_action: JSON.parse(props.data),
                  },
              },
          }
        : {};

    const payload = {
        payload: {
            applicationId: props.applicationId,
            appversionId: props.appVersionId,
            message: props.text
                ? {
                      original_text: props.text,
                  }
                : {},
            device: props.config.device || {
                type: 'SBERBOX',
                locale: 'ru-RU',
                timezone: '+03:00',
                install_id: v4(),
            },
        },
    };

    return {
        messageName,
        sessionId: props.sessionId,
        messageId: String(Math.floor(Math.random() * Math.floor(9999999))),
        meta: {
            current_app: {
                state: props.state,
            },
        },
        uuid: {
            userId: props.userId,
            userChannel: 'FAKE',
        },
        ...systemMessage,
        ...payload,
    };
};

export interface IntitializeProps {
    request: {
        url: string;
        method?: 'get' | 'post' | 'put';
        headers?: {};
    };
    device?: DPMessage['payload']['device'];
    onRequest: (message: DPMessage) => {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: (res: any) => AssistantAction | AssistantServerAction | undefined;
    onError?: (e: Error) => void;
}

const defaultConfig: IntitializeProps = {
    request: {
        url: 'sberbank.ru',
    },
    onRequest: (props) => props,
    onResponse: (res) => res,
    onError: () => {},
};

export function initializeDebugging(config: IntitializeProps = defaultConfig) {
    let currentAppState: AssistantAppState = {};
    const sessionId = v4();
    const userId = v4();
    const applicationId = v4();
    const appVersionId = v4();

    const createMessageInSession = (
        props: Omit<CreateMessageProps, 'sessionId' | 'userId' | 'applicationId' | 'appVersionId' | 'state' | 'config'>,
    ) =>
        createMessage({
            config,
            userId,
            sessionId,
            applicationId,
            appVersionId,
            state: currentAppState,
            ...props,
        });

    const ask = (props: AppMessage) =>
        axios({
            method: config.request?.method || 'post',
            url: config.request.url,
            headers: config.request?.headers,
            data: config.onRequest(createMessageInSession(props)),
        })
            .then(config.onResponse)
            .then((action: unknown) => {
                if (action && window.AssistantClient?.onData) window.AssistantClient.onData(action as (AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand));
            })
            .catch(config.onError);

    window.AssistantHost = {
        close() {},
        ready() {
            setTimeout(() => {
                if (window.AssistantClient?.onStart) window.AssistantClient.onStart();
            }, 0);
        },

        updateState(state) {
            currentAppState = JSON.parse(state);
        },

        setState(state) {
            currentAppState = JSON.parse(state);
        },

        sendData(data, name) {
            ask({
                data,
                name: name || undefined
            });
        },
        setSuggest() {},
    };

    window.__dangerouslyGetAssistantAppState = () => ({ ...currentAppState });
    window.__dangerouslySendVoiceMessage = (text) => {
        if (window.AssistantClient?.onRequestState) window.AssistantClient.onRequestState();

        setTimeout(
            () =>
                ask({
                    text,
                }),
            STATE_UPDATE_TIMEOUT,
        );
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.__dangerouslySendDataMessage = (data: any, name: string | null = null) =>
        window.AssistantHost?.sendData(JSON.stringify(data), name);
}

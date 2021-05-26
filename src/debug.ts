/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { v4 } from 'uuid';

import {
    DPMessage,
    AssistantAppState,
    Action,
    AssistantServerAction,
    AssistantCharacterCommand,
    AssistantNavigationCommand,
    AssistantSmartAppCommand,
} from './typings';

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
                  data: JSON.stringify({
                      app_info: {},
                      server_action: JSON.parse(props.data),
                  }),
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
        messageId: Math.floor(Math.random() * Math.floor(9999999)),
        meta: {
            current_app: JSON.stringify({
                state: props.state,
            }),
        },
        uuid: {
            userId: props.userId,
            userChannel: 'FAKE',
            sub: 'fake_sub',
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
    device?: DPMessage['device'];
    onRequest: (message: DPMessage) => {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: (res: any) => Action | AssistantServerAction | undefined;
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
    const currentAppState: AssistantAppState = {};
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
                if (action && window.AssistantClient?.onData) {
                    window.AssistantClient.onData(
                        action as AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand,
                    );
                }
            })
            .catch(config.onError);

    window.AssistantHost = {
        close() {},
        ready() {
            setTimeout(() => {
                if (window.AssistantClient?.onStart) window.AssistantClient.onStart();
            }, 0);
        },

        sendData(data, name) {
            ask({
                data,
                name: name || undefined,
            });
        },

        sendDataContainer(container: string) {
            const { data, message_name } = JSON.parse(container);

            ask({
                data,
                name: message_name || undefined,
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

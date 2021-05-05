/// <reference types="cypress" />
import { createAssistant } from '../../src/index';

/* eslint-disable @typescript-eslint/camelcase */

describe('Проверяем sendAction', () => {
    beforeEach(() => {
        window.AssistantHost = {
            close: cy.stub(),
            ready: cy.stub(),
            setSuggest: cy.stub(),
        };
    });

    afterEach(() => {
        delete window.AssistantHost;
    });

    const state = {};
    const recoveryState = {};
    const requestId = 'custom_requestId';
    const name = 'custom_message_name';
    const action = { type: 'test_action', payload: { test: 'action' } };
    const dataCommand = { type: 'smart_app_data', smart_app_data: { command: 'test_cmd' } };
    const errorCommand = {
        type: 'smart_app_error',
        smart_app_error: { code: 500, description: 'Some technical problem' },
    };
    const getState = () => state;
    const getRecoveryState = () => recoveryState;
    const initAssistant = () => createAssistant({ getState, getRecoveryState });

    it('sendAction должен вызывать assistantHost.sendDataContainer', (done) => {
        const assistant = initAssistant();

        window.AssistantHost.sendDataContainer = (sended) => {
            const { data, message_name, requestId } = JSON.parse(sended);
            expect(data, 'пришел экшен').to.deep.equal(action);
            expect(message_name, 'message_name не заполнен').to.empty;
            expect(requestId, 'requestId заполнен').to.not.empty;
            done();
        };

        assistant.sendAction(action);
    });

    it('sendAction должен проксировать name и requestId в assistantHost.sendDataContainer', (done) => {
        const assistant = initAssistant();

        window.AssistantHost.sendDataContainer = (sended) => {
            const { data, message_name, requestId } = JSON.parse(sended);
            expect(data, 'пришел экшен').to.deep.equal(action);
            expect(message_name, 'message_name передан').to.equal(name);
            expect(requestId, 'requestId передан').to.equal(requestId);
            done();
        };

        assistant.sendAction(action, undefined, undefined, { name, requestId });
    });

    it('Вызов assistantClient.onData вызывает обработчики on("data") и on("error")', (done) => {
        const status = { data: false, error: false };
        const commands = [dataCommand, errorCommand];
        const assistant = initAssistant();

        window.AssistantHost.sendDataContainer = (data) => {
            const { requestId } = JSON.parse(data);
            setTimeout(() =>
                commands.map((command) => window.AssistantClient.onData({ ...command, sdk_meta: { requestId } })),
            );
        };

        assistant.sendAction(
            action,
            (data) => {
                expect(data).to.deep.equal(dataCommand.smart_app_data);
                status.data = true;
                if (status.error) {
                    done();
                }
            },
            (error) => {
                expect(error).to.deep.equal(errorCommand.smart_app_error);
                status.error = true;
                if (status.data) {
                    done();
                }
            },
            { requestId },
        );
    });

    it('Если не передавать onData и onError, должна срабатывать общая подписка', () => {
        const commands = [dataCommand, errorCommand];
        const assistant = initAssistant();

        window.AssistantHost.sendDataContainer = (data) => {
            const { requestId } = JSON.parse(data);
            setTimeout(() =>
                commands.map((command, i) =>
                    setTimeout(() => window.AssistantClient.onData({ ...command, sdk_meta: { requestId } }), i),
                ),
            );
        };

        assistant.on('data', (data) => {
            if (data.smart_app_data) {
                expect(data.smart_app_data).to.deep.equal(dataCommand.smart_app_data);
            } else {
                expect(data.smart_app_error).to.deep.equal(errorCommand.smart_app_error);
            }
        });

        assistant.sendAction(action);
    });

    it('После вызова clear обработчики не работают', (done) => {
        let counter = 0;
        const commands = [dataCommand, dataCommand];
        const assistant = initAssistant();

        window.AssistantHost.sendDataContainer = (data) => {
            const { requestId } = JSON.parse(data);
            setTimeout(() =>
                commands.map((command, i) =>
                    setTimeout(() => window.AssistantClient.onData({ ...command, sdk_meta: { requestId } }), i),
                ),
            );
        };

        const clear = assistant.sendAction(
            action,
            (data) => {
                counter++;
                clear();
                expect(data).to.deep.equal(dataCommand.smart_app_data);
                if (counter > 1) {
                    throw new Error('Обработчик вызвал больше одного раза');
                }
                done();
            },
            undefined,
            { requestId },
        );
    });
});

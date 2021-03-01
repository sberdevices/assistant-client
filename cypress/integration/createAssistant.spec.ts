/// <reference types="cypress" />
import { createAssistant } from '../../src/index';

/* eslint-disable @typescript-eslint/camelcase */

describe('Проверяем createAssistant', () => {
    beforeEach(() => {
        window.appInitialData = [{ type: 'character', character: { id: 'sber' } }];
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
    const action = { action_id: 'test_action' };
    const messageName = 'TEST_ACTION';
    const requestId = 'TEST-0001';
    const getState = () => state;
    const getRecoveryState = () => recoveryState;
    const initAssistant = () => createAssistant({ getState, getRecoveryState });

    const expectSendData = (
        assistant: ReturnType<typeof createAssistant>,
        expectedAction: any,
        expectedName: string | null,
    ) =>
        new Promise((resolve) => {
            window.AssistantHost.sendData = (action: string, name: string | null) => {
                expect(action).not.undefined;
                expect(action).not.empty;
                expect(expectedAction).to.deep.equal(JSON.parse(action));
                if (expectedName) {
                    expect(expectedName).to.equal(name);
                } else {
                    expect(name).null; // отправляем null, вместо undefined
                }
                resolve();
            };

            assistant.sendData({ action: expectedAction, name: expectedName });
        });

    const expectSendDataContainer = (
        assistant: ReturnType<typeof createAssistant>,
        expectedAction: any,
        expectedName?: string,
        expectedRequestId?: string,
    ) =>
        new Promise((resolve) => {
            window.AssistantHost.sendData = cy.stub();
            window.AssistantHost.sendDataContainer = (container: string) => {
                const { data, message_name, requestId } = JSON.parse(container);

                expect(expectedAction).to.deep.equal(data);
                expect(expectedRequestId).to.equal(requestId);
                if (expectedName) {
                    expect(expectedName).to.equal(message_name);
                } else {
                    expect(message_name).empty; // отправляем пустую строку, вместо undefined
                }

                resolve();
            };

            assistant.sendData({ action: expectedAction, name: expectedName, requestId: expectedRequestId });
        });

    it('Не падать без appInitialData', (done) => {
        window.appInitialData = undefined;
        initAssistant();
        done();
    });

    it('Проверяем вызов AssistantHost.ready', () => {
        initAssistant();
        setTimeout(() => expect(window.AssistantHost.ready).to.be.calledOnce);
    });

    it('Проверяем getState и getRecoveryState', () => {
        const assistant = initAssistant();
        const newState = {};
        const newRecoveryState = {};
        // assistantClient должен возвращать state из конструктора
        expect(window.AssistantClient.onRequestState()).to.equal(state);
        // assistantClient должен возвращать recoveryState из конструктора
        expect(window.AssistantClient.onRequestRecoveryState()).to.equal(recoveryState);

        assistant.setGetState(() => newState);
        assistant.setGetRecoveryState(() => newRecoveryState);
        // assistantClient должен возвращать newState
        expect(window.AssistantClient.onRequestState()).to.equal(newState);
        // assistantClient должен возвращать newRecoveryState
        expect(window.AssistantClient.onRequestRecoveryState()).to.equal(newRecoveryState);
    });

    it('Проверяем getInitialData', () => {
        const appInitialData = [...(window.appInitialData || [])];
        const assistant = initAssistant();
        expect(assistant.getInitialData()).to.deep.equal(window.appInitialData);
    });

    it('Проверяем sendData', (done) => {
        const assistant = initAssistant();

        expectSendData(assistant, action, null)
            .then(() => expectSendData(assistant, action, messageName))
            .then(() => expectSendDataContainer(assistant, action))
            .then(() => expectSendDataContainer(assistant, action, messageName))
            .then(() => expectSendDataContainer(assistant, action, messageName, requestId))
            .then(() => expectSendDataContainer(assistant, action, undefined, requestId))
            .then(done);
    });

    it('Проверяем sendData c подпиской на ответ', (done) => {
        const status = { first: false, second: false };
        const requestId = '654321';
        const action = { action_id: 'test_action' };
        const command = { type: 'smart_app_data', smart_app_data: { command: 'test_cmd' } };
        const assistant = initAssistant();

        // ожидаем исключение, если sendDataContainer не определен
        window.AssistantHost.sendDataContainer = undefined;
        expect(() => assistant.sendDataWithAnswer({ action })).to.throw();

        // не передаем requestId, ожидаем ответ
        window.AssistantHost.sendDataContainer = (data) => {
            const { requestId } = JSON.parse(data);
            setTimeout(() => window.AssistantClient.onData({ ...command, sdkMeta: { requestId } }));
        };
        assistant.sendData({ action }, (cmd) => {
            expect(cmd).to.deep.equal(command);
            status.first = true;
            if (status.second) {
                done();
            }
        });

        // передаем requestId, ожидаем ответ
        assistant.sendData({ action, requestId }, ({ sdkMeta, ...cmd }) => {
            expect(cmd).to.deep.equal(command);
            expect(sdkMeta?.requestId).to.equal(requestId);
            status.second = true;
            if (status.first) {
                done();
            }
        });
    });

    it('Проверяем подписку на события ассистента', () => {
        const onStart = cy.stub();
        const onData = cy.stub();
        const command = { smart_app_data: { command: 'test_command' }, type: 'smart_app_command' };
        const assistant = initAssistant();
        assistant.on('start', onStart);
        assistant.on('data', onData);

        window.AssistantClient.onStart();
        expect(onStart).to.calledOnce;

        window.AssistantClient.onData(command);
        expect(onData).to.calledWith(command);
    });

    it('Проверяем проксирование close', () => {
        const assistant = initAssistant();
        assistant.close();
        expect(window.AssistantHost.close).to.calledOnce;
    });

    it('Проверяем проксирование setSuggest', () => {
        const suggest = 'test_suggest';
        const assistant = initAssistant();
        assistant.setSuggest(suggest);
        expect(window.AssistantHost.setSuggest).to.calledWith(suggest);
    });
});

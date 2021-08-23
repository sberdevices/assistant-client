/// <reference types="cypress" />
import { createAssistant } from '../../src/index';

/* eslint-disable @typescript-eslint/camelcase */

describe('Проверяем createAssistant', () => {
    beforeEach(() => {
        window.appInitialData = [];
        window.AssistantHost = {
            close: cy.stub(),
            ready: cy.stub(),
            setSuggests: cy.stub(),
            setHints: cy.stub(),
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
    const initialData = [
        { type: 'character', character: { id: 'sber' }, sdk_meta: { mid: '-1' } },
        { type: 'insets', insets: { left: 0, top: 0, right: 0, bottom: 144 }, sdk_meta: { mid: '-1' } },
        { type: 'smart_app_data', smart_app_data: { command: 'TEST_COMMAND' }, sdk_meta: { mid: '123456' } },
    ];

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
        window.appInitialData = [...initialData];
        const assistant = initAssistant();
        expect(assistant.getInitialData()).to.deep.equal(initialData);
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
            setTimeout(() => window.AssistantClient.onData({ ...command, sdk_meta: { requestId } }));
        };
        assistant.sendData({ action }, ({ sdk_meta, ...cmd }) => {
            expect(cmd).to.deep.equal(command);
            status.first = true;
            if (status.second) {
                done();
            }
        });

        // передаем requestId, ожидаем ответ
        assistant.sendData({ action, requestId }, ({ sdk_meta, ...cmd }) => {
            expect(cmd).to.deep.equal(command);
            expect(sdk_meta?.requestId).to.equal(requestId);
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

    it('Проверяем проксирование setSuggests', () => {
        const suggest = 'test_suggest';
        const assistant = initAssistant();
        assistant.setSuggests(suggest);
        expect(window.AssistantHost.setSuggests).to.calledWith(suggest);
    });

    it('Проверяем проксирование setHints', () => {
        const hints = 'test_hints';
        const assistant = initAssistant();
        assistant.setHints(hints);
        expect(window.AssistantHost.setHints).to.calledWith(hints);
    });

    it("Проверяем фильтрацию system.command = 'back' - не должна попадать в onData", () => {
        const onData = cy.stub();
        const assistant = initAssistant();

        window.AssistantClient.onStart();
        window.AssistantClient.onData({ type: 'system', system: { command: 'BACK' } });

        expect(onData).to.not.called;
    });

    it('Эмитить appInitialData в onData, также не эмитить дважды', () => {
        window.appInitialData = [...initialData];

        const onData = cy.stub();
        const assistant = initAssistant();

        assistant.on('data', onData);

        window.AssistantClient.onStart();

        initialData.forEach((command) => window.AssistantClient.onData(command));

        initialData.forEach((command) => {
            expect(onData).to.calledWith(command);
        });

        expect(onData).to.callCount(initialData.length);
    });

    it('Не эмитить appInitialData в onData, если был вызван appInitialData; также не эмитить дважды', () => {
        window.appInitialData = [...initialData];

        const onData = cy.stub();
        const assistant = initAssistant();

        assistant.getInitialData();
        assistant.on('data', onData);

        window.AssistantClient.onStart();
        initialData.forEach((command) => window.AssistantClient.onData(command));

        expect(onData).to.not.called;
    });
});

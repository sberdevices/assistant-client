/// <reference types="cypress" />
import { AssistantSmartAppData } from '../../src/typings';
import { createAssistant } from '../../src/index';
import { Hints, Suggestions } from '@salutejs/scenario';

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
    const initAssistant = <A extends AssistantSmartAppData>() => createAssistant<A>({ getState, getRecoveryState });
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

    it('Проверяем проксирование и преобразование данных в setSuggests', () => {
        const suggests: Suggestions['buttons'] = [{ title: 'test', action: { type: 'text', text: 'test' } }];
        const assistant = initAssistant();
        assistant.setSuggests(suggests);
        expect(window.AssistantHost.setSuggests).to.calledWith(JSON.stringify({ suggestions: { buttons: suggests } }));
    });

    it('Проверяем проксирование и преобразование данных в setHints', () => {
        const hints: Hints = { items: [{ text: 'test', alive_time: 0, next_time: 0 }] };
        const assistant = initAssistant();
        assistant.setHints(hints);
        expect(window.AssistantHost.setHints).to.calledWith(JSON.stringify({ hints }));
    });

    it("Проверяем фильтрацию system.command = 'back' - не должна попадать в onData", () => {
        const onData = cy.stub();
        initAssistant();

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

    it('appInitialData может меняться после инициализации', () => {
        const firstInitialData = initialData.slice(0, 2);
        window.appInitialData = [...firstInitialData];

        const onData = cy.stub();
        const assistant = initAssistant();

        assistant.on('data', onData);

        setTimeout(() => {
            window.appInitialData.push(initialData[2]);

            window.AssistantClient.onStart();

            initialData.forEach((command) => {
                expect(onData).to.calledWith(command);
            });

            expect(onData).to.callCount(initialData.length);
        }, 1);
    });

    it('Не эмитить дважды команды из window.appInitialData', () => {
        const initialSmartAppData = [
            {
                type: 'insets',
                insets: { left: 0, top: 0, right: 0, bottom: 144 },
                sdk_meta: { mid: '-1' },
            },
            {
                type: 'character',
                character: { id: 'sber' },
                sdk_meta: { mid: '-1' },
            },
        ];

        const onData = cy.stub();
        const assistant = initAssistant();

        assistant.on('data', onData);

        window.appInitialData = [...initialSmartAppData];

        for (const smartAppData of initialSmartAppData) {
            window.AssistantClient.onData(smartAppData);
        }

        initialSmartAppData.forEach((command) => expect(onData).to.calledWith(command));
    });

    it('Подписки onSmartAppCommand, onAssistantCommand, onSmartAppError получают то, что нужно', () => {
        const smartAppErrors = [
            {
                type: 'smart_app_error',
                smart_app_error: {
                    code: -1,
                },
            },
        ];

        type MySmartAppCommands =
            | { type: 'MY_FIRST_ACTION' | 'MY_SECOND_ACTION'; payload: string[] }
            | { command: 'MY_COMMAND'; MY_COMMAND: string[] };

        const smartAppCommands: Array<AssistantSmartAppData & { smart_app_data: MySmartAppCommands }> = [
            {
                type: 'smart_app_data',
                smart_app_data: {
                    type: 'MY_FIRST_ACTION',
                    payload: ['action-one'],
                },
            },
            {
                type: 'smart_app_data',
                smart_app_data: {
                    type: 'MY_SECOND_ACTION',
                    payload: ['action-two'],
                },
            },
            {
                type: 'smart_app_data',
                smart_app_data: {
                    command: 'MY_COMMAND',
                    MY_COMMAND: ['command-one'],
                },
            },
        ];

        const stubOnData = cy.stub();

        const assistant = initAssistant<typeof smartAppCommands[0]>();

        assistant.onAssistantCommand('insets', (command) => expect(command).to.be.equal(initialData[1]));

        assistant.onSmartAppData('MY_SECOND_ACTION', (command) =>
            expect(command).to.be.equal(smartAppCommands[1].smart_app_data),
        );

        assistant.onSmartAppData('MY_COMMAND', (command) =>
            expect(command).to.be.equal(smartAppCommands[2].smart_app_data),
        );

        assistant.onSmartAppError((error) => expect(error).to.be.equal(smartAppErrors[0].smart_app_error));

        assistant.onAssistantCommand('MY_SECOND_ACTION', () => {
            throw new Error('Подписка не должна сработать, так как это команда сценария (а не ассистента)');
        });

        assistant.onSmartAppData('insets', () => {
            throw new Error('Подписка не должна сработать, так как это команда ассистента (а не сценария)');
        });

        assistant.on('data', stubOnData);

        const commands = [...initialData, ...smartAppErrors, ...smartAppCommands];
        commands.forEach(window.AssistantClient.onData);

        commands.forEach((command) => expect(stubOnData).calledWith(command));
    });
});

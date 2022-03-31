/// <reference types="cypress" />
import { createAssistant } from '../../src/index';

describe('Проверяем createAssistant на вебе (без сдк)', () => {
    const state = { type: 'test app state' };
    const recoveryState = { type: 'test app recovery state' };
    let expectAfterIt = undefined;

    before(() => {
        createAssistant({ getState: () => ({}) });
        window.AssistantClient = {
            onData: cy.stub(),
            onStart: cy.stub(),
            onRequestState: cy.stub().returns(state),
            onRequestRecoveryState: cy.stub().returns(recoveryState)
        };
    });

    beforeEach(() => {
        expectAfterIt = undefined;
        window.top.postMessage = cy.stub();
    })

    afterEach(() => {
        expectAfterIt && expectAfterIt();
    })

    it('appInitialData и AssistantHost установлены', () => {
        expect(window.appInitialData).to.deep.equals([]);
        expect(window.AssistantHost).to.not.undefined;
    });

    it('Проксирование onStart', () => {
        window.postMessage(JSON.stringify({ type: 'onStart' }), '*');
        cy.wrap(window.AssistantClient.onStart).should(onStart => expect(onStart).to.calledOnce);
    });

    it('Проксирование onData', () => {
        const payload = { type: 'test' };

        window.postMessage(JSON.stringify({ type: 'onData', payload }), '*');
        cy.wrap(window.AssistantClient.onData).should(onData => expect(onData).to.calledOnceWith(payload));
    });

    it('Реакция onRequestState', () => {
        expectAfterIt = () => {
            expect(window.AssistantClient.onRequestState).to.calledOnce;
            expect(window.top.postMessage).to.calledOnceWith(JSON.stringify({ type: 'state', payload: state }), '*');
        };
        window.postMessage(JSON.stringify({ type: 'onRequestState' }), '*');
    });

    it('Реакция onRequestRecoveryState', () => {
        expectAfterIt = () => {
            expect(window.AssistantClient.onRequestRecoveryState).to.calledOnce;
            expect(window.top.postMessage).to.calledOnceWith(JSON.stringify({ type: 'recoveryState', payload: recoveryState }), '*');
        };
        window.postMessage(JSON.stringify({ type: 'onRequestRecoveryState' }), '*');
    });

    it('Закрытие вкладки', () => {
        window.history.back = cy.stub();
        expectAfterIt = () => {
            expect(window.history.back).to.calledOnce;
            cy.wrap(window.top.postMessage, { timeout: 600 }).should(func => expect(func).to.calledOnceWith(JSON.stringify({ type: 'close' }), '*'));
        };

        window.postMessage(JSON.stringify({ type: 'onBack' }), '*');
    });
});
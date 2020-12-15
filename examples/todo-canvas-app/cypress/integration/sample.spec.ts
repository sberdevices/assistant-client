/// <reference types="cypress" />
import { createAssistantHostMock } from '@sberdevices/assistant-client';

const ITEMS = [
    {
        id: 1,
        title: 'Купить молоко',
        number: 1,
    },
    {
        id: 2,
        title: 'Купить хлеб',
        number: 2,
    },
];

describe('Мой список дел', () => {
    it('По клику на чекбокс - ожидаем экшен "done" c заголовком выбранного элемента', (done) => {
        cy.visit('/')
            .window()
            .then((window) => {
                const mock = createAssistantHostMock({ context: window });
                const selected = ITEMS[1];
                mock.onReady(() => {
                    mock.receiveCommand({
                        type: 'smart_app_data',
                        action: {
                            type: 'init',
                            notes: [...ITEMS],
                        },
                    })
                        .then(() =>
                            mock.waitAction(() =>
                                // ждем клик, эмулируем отметку выполнения пользователем
                                window.document.getElementById(`checkbox-note-${selected.id}`).click(),
                            ),
                        )
                        .then(({ action, state }) => {
                            expect(action.action_id).to.equal('done'); // ожидаем экшен data_note
                            expect(action.parameters?.title).to.equal(selected.title); // ожидаем в параметрах title экшена
                            expect(state?.item_selector.items).to.deep.equal(ITEMS); // ожидаем отправку списка в стейте
                            done();
                        });
                });
            });
    });
});

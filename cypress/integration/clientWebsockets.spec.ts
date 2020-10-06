/// <reference types="cypress" />
import { Server, WebSocket } from 'mock-socket';

import { createOnPromise, getClient } from '../support/helpers/clientMethods.helpers';

const socketUrl = 'ws://test.com';
describe('Тестирование файла client.ts на корректность работы с вебсокетами', () => {
    let server: undefined | Server;

    beforeEach(() => {
        cy.stub(window, 'WebSocket').callsFake((url) => new WebSocket(url));
        server = new Server(socketUrl);
    });

    afterEach(() => {
        if (server) {
            server.stop();
            server = undefined;
        }
    });

    it('при подключении должно вызываться событие connecting', (done) => {
        const client = getClient(socketUrl);

        createOnPromise(client, 'connecting').then((res) => {
            expect(res).to.eq('connecting');
            done();
        });
    });

    it('после успешного подключения должно вызываться событие ready', (done) => {
        const client = getClient(socketUrl);
        cy.wrap(null).then(() => {
            createOnPromise(client, 'ready').then((res) => {
                expect(res).to.eq('ready');
                done();
            });
        });
    });

    it('после разрыва связи должно вызываться событие close', (done) => {
        const client = getClient(socketUrl);
        setTimeout(() => {
            server.clients().forEach((serverClient) => serverClient.close());
        }, 100);

        createOnPromise(client, 'close').then((res) => {
            expect(res).to.eq('close');
            done();
        });
    });

    it('задержка между попытками переподключиться должна увеличиваться с каждой неудачной попыткой', (done) => {
        let retries = 0;
        const client = getClient(socketUrl);

        server.clients().forEach((c) => c.close());
        client.on('close', () => {
            retries++;
        });
        server.stop();

        setTimeout(() => {
            expect(retries).to.eq(5); // изначальное закрытие + попытки на 0ms, 300ms, 900ms, 1800ms
        }, 2000);

        setTimeout(() => {
            server = new Server(socketUrl);
            createOnPromise(client, 'ready').then((res) => {
                expect(res).to.eq('ready');
                client.destroy();
                done();
            });
        }, 2000);
    });
});

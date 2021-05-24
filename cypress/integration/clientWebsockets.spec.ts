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

    it('после третьей неудачной попытки переподключиться должно вызываться событие error', (done) => {
        let retries = 0;

        server.stop();
        const client = getClient(socketUrl);

        client.on('close', () => {
            retries++;
        });

        setTimeout(() => {
            expect(retries).to.eq(4); // изначальное закрытие + попытки на 0ms, 300ms, 900ms
        }, 1000);

        client.on('connectionError', (e) => {
            expect(e.type).to.eq('error');
            client.destroy();
            done();
        });
    });
});

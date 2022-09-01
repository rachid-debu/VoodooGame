const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

const ROUTE = '/api/games/search'

describe(`GET ${ROUTE}`, async () => {
    let data = {
        publisherId: "12345678901",
        name: "Test App 1",
        platform: "ios",
        storeId: "123451",
        bundleId: "test.bundle.id1",
        appVersion: "1.0.0",
        isPublished: true
    }

    await request(app)
        .post('/api/games')
        .set('Accept', 'application/json')
        .send(data)
    
    it('respond with 200 when no search params', async () => {
        const { body, status } = await request(app)
            .post(ROUTE)
            .set('Accept', 'application/json')
            .send()
        assert.strictEqual(status, 200);
    });

    it('respond with 200 with data when search matches', async () => {
        const { body, status } = await request(app)
            .post(ROUTE)
            .set('Accept', 'application/json')
            .send({ name: 'App' })
        assert.strictEqual(status, 200);
    });

    it('respond with 200 with no data when search does not match', async () => {
        const { body, status } = await request(app)
            .post(ROUTE)
            .set('Accept', 'application/json')
            .send({ name: 'Appzzz' })
        assert.strictEqual(status, 200);
    });
})
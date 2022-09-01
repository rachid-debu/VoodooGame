const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

/**
 * Testing update game endpoint
 */
 describe('PUT /api/games/1', async () => {
    let data = {
        id : 1,
        publisherId: "999000999",
        name: "Test App Updated",
        platform: "android",
        storeId: "5678",
        bundleId: "test.newBundle.id",
        appVersion: "1.0.1",
        isPublished: false
    }
    await request(app)
        .post('/api/games')
        .set('Accept', 'application/json')
        .send(data)

    it('respond with 200 and an updated object', async () => {
        const { body, status } = await request(app)
            .put('/api/games/1')
            .set('Accept', 'application/json')
            .send(data)
        assert.strictEqual(status, 200);
        assert.strictEqual(body.publisherId, '999000999');
        assert.strictEqual(body.name, 'Test App Updated');
        assert.strictEqual(body.platform, 'android');
        assert.strictEqual(body.storeId, '5678');
        assert.strictEqual(body.bundleId, 'test.newBundle.id');
        assert.strictEqual(body.appVersion, '1.0.1');
        assert.strictEqual(body.isPublished, false);
    });
});

const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

/**
 * Testing get all games endpoint
 */
 describe('GET /api/games', async () => {
    let data = {
        publisherId: "1234567890",
        name: "Test App",
        platform: "ios",
        storeId: "1234",
        bundleId: "test.bundle.id",
        appVersion: "1.0.0",
        isPublished: true
    }
    await request(app)
            .post('/api/games')
            .set('Accept', 'application/json')
            .send(data)

    it('respond with json containing a list that includes the game we just created', async () => {
        const { body, status } = await request(app)
            .get('/api/games')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 200);
        assert.strictEqual(body[0].publisherId, '1234567890');
        assert.strictEqual(body[0].name, 'Test App');
        assert.strictEqual(body[0].platform, 'ios');
        assert.strictEqual(body[0].storeId, '1234');
        assert.strictEqual(body[0].bundleId, 'test.bundle.id');
        assert.strictEqual(body[0].appVersion, '1.0.0');
        assert.strictEqual(body[0].isPublished, true);
    });
});
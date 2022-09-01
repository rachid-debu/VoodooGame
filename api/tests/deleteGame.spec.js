const request = require('supertest');
const assert = require('assert');
const app = require('../../index');

/**
 * Testing update game endpoint
 */
 describe('DELETE /api/games/1', () => {
    it('respond with 200', async () => {
        const { body, status } = await request(app)
            .delete('/api/games/1')
            .set('Accept', 'application/json')
        assert.strictEqual(status, 200);
        assert.strictEqual(body.id, 1);
    });
});
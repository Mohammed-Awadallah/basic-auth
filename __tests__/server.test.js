'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);
const { db } = require('../src/models/index');
const { expect } = require('@jest/globals');

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('Web server', () => {
    it('404 response', async () => {
        const response = await request.get('/randomPath');
        expect(response.status).toBe(404);
    });
});
describe('basic Auth', () => {
    it('Signup', async () => {
        const response = await request.post('/signUp').send({
            userName: "test",
            password: "test123"
        });
        const response2 = await request.post('/signUp').send({
            userName: "mohammed",
            password: "zzzedd"
        });
        expect(response.status).toBe(201);
        expect(response2.status).toBe(201);
    });
    test('log in with existant account', async () => {
        const response = await request.post('/login').auth("test", "test123");
        const response2 = await request.post('/login').auth("mohammed", "zzzedd");
        expect(response.status).toBe(200);
        expect(response2.status).toBe(200);
    });
    test('log in with wrong password', async () => {
        const response = await request.post('/login').auth("test", "zdftre");
        expect(response.status).toBe(403);
    });
    test('log in not auth account', async () => {
        const response = await request.post('/login').auth("aliiooo", "zxvzvvfsdfs");
        expect(response.status).toBe(403);
    });
});
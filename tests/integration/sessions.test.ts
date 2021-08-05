import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { createUser } from '../factories/userFactory';
import { clearDatabase } from '../utils/database';
import faker from 'faker';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe('POST /sign-in', () => {
    it('should answer with status 200 and a token', async () => {
        const user = await createUser();

        const userSignIn = {
            email: user.email,
            password: user.password,
        };

        const response = await supertest(app).post('/sign-in').send(userSignIn);

        expect(response.status).toBe(200);
    });
});

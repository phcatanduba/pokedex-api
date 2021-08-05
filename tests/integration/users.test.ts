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

describe('POST /sign-up', () => {
    it('should answer with status 201', async () => {
        const fakePassword = faker.internet.password();
        const user = {
            email: faker.internet.email(),
            password: fakePassword,
            confirmPassword: fakePassword,
        };

        const response = await supertest(app).post('/sign-up').send(user);

        expect(response.status).toBe(201);
    });
});

describe('POST /sign-up', () => {
    it('should answer with status 409', async () => {
        const user = await createUser();

        const response = await supertest(app).post('/sign-up').send(user);

        expect(response.status).toBe(409);
    });
});

describe('POST /sign-up', () => {
    it('should answer with status 400', async () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const response = await supertest(app).post('/sign-up').send(user);

        expect(response.status).toBe(400);
    });
});

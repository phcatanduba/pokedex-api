import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { createUser } from '../factories/userFactory';
import { clearDatabase } from '../utils/database';
import faker from 'faker';
import { createPokemon } from '../../src/interfaces/createPokemonInterface';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe('POST /my-pokemons/:id/add', () => {
    it('should answer with status 200', async () => {
        const user = await createUser();
        const userSignIn = {
            email: user.email,
            password: user.password,
        };

        const promise = await supertest(app).post('/sign-in').send(userSignIn);
        const { token } = promise.body;
        const id = 1;

        const response = await supertest(app)
            .post(`/my-pokemons/${id}/add`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});

describe('POST /my-pokemons/:id/add', () => {
    it('should answer with status 400', async () => {
        const token = faker.datatype.string();
        const id = 1;
        const response = await supertest(app)
            .post(`/my-pokemons/${id}/add`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
});

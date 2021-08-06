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
        const pokemonId = faker.datatype.number();

        const pokemon: object = {
            name: faker.name.firstName(),
            number: faker.datatype.number(),
            image: faker.image.imageUrl(),
            weight: faker.datatype.number(),
            height: faker.datatype.number(),
            baseExp: faker.datatype.number(),
            description: faker.lorem.paragraph(),
        };

        const response = await supertest(app)
            .post(`/my-pokemons/${pokemonId}/add`)
            .set('Authorization', `Bearer ${token}`)
            .send(pokemon);
        expect(response.status).toBe(200);
    });
});

import { getRepository } from 'typeorm';
import faker from 'faker';
import User from '../../src/entities/User';

export async function createUser() {
    const user = await getRepository(User).create({
        email: faker.internet.email(),
        password: '123456',
    });

    await getRepository(User).save(user);

    return {
        email: user.email,
        password: user.password,
        confirmPassword: user.password,
    };
}

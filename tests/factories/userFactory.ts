import { getRepository } from 'typeorm';
import faker from 'faker';
import User from '../../src/entities/User';
import bcrypt from 'bcrypt';

export async function createUser() {
    const fakePassword = faker.internet.password();
    const hash = bcrypt.hashSync(fakePassword, 10);
    const user = await getRepository(User).create({
        email: faker.internet.email(),
        password: hash,
    });

    await getRepository(User).save(user);

    return {
        email: user.email,
        password: fakePassword,
        confirmPassword: fakePassword,
    };
}

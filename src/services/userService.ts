import { getRepository } from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';

export async function signup(email: string, password: string) {
    const hash = encrypt(password);

    const users = await getRepository(User).insert({
        email,
        password: hash,
    });

    return users;
}

export async function hasThisEmail(email: string) {
    const user = await getRepository(User).find({ where: { email } });
    if (user.length === 0) {
        return false;
    } else {
        return true;
    }
}

function encrypt(password: string) {
    return bcrypt.hashSync(password, 10);
}

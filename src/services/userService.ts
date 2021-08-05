import { getRepository } from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import Sessions from '../entities/Session';

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

export async function verifyEmailAndPassword(email: string, password: string) {
    const user = await getRepository(User).find({ where: { email } });
    if (user.length === 0) {
        return false;
    } else if (bcrypt.compareSync(password, user[0].password)) {
        return true;
    } else {
        return false;
    }
}

export async function isAValidToken(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const response = await getRepository(Sessions).find();
    if (response.length === 0) {
        return false;
    } else {
        return true;
    }
}

export async function getUser(email: string) {
    const user = await getRepository(User).findOne({ where: { email } });
    return user;
}

function encrypt(password: string) {
    return bcrypt.hashSync(password, 10);
}

import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../entities/User';
import Pokemon from '../entities/Pokemon';
import Sessions from '../entities/Session';
import UserPokemon from '../entities/UserPokemon';

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
    const response = await getRepository(Sessions).find({ where: { token } });
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

export async function addPokemon(id: number) {
    const pokemon = await getRepository(Pokemon).findOne({ where: { id } });
    if (pokemon === undefined) {
        return false;
    } else {
        await getRepository(UserPokemon).insert(pokemon);
        return true;
    }
}

function encrypt(password: string) {
    return bcrypt.hashSync(password, 10);
}

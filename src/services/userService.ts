import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';

export async function signup(email: string, password: string) {
    const users = await getRepository(User).insert({
        email,
        password,
    });

    return users;
}

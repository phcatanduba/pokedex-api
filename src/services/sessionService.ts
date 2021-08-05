import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import Session from '../entities/Session';
import * as userService from '../services/userService';

export async function create(email: string) {
    const user = await userService.getUser(email);

    const token = jwt.sign('OK', process.env.JWT_SECRET);
    await getRepository(Session).insert({ usersId: user.id, token });

    return token;
}

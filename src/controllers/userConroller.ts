import { Request, Response } from 'express';

import * as userService from '../services/userService';

export async function signup(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
        res.sendStatus(400);
    }
    try {
        const users = await userService.signup(email, password);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

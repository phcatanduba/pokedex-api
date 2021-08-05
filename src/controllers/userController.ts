import { Request, Response } from 'express';

import * as userService from '../services/userService';

export async function signup(req: Request, res: Response) {
    const { email, password, confirmPassword } = req.body as {
        email: string;
        password: string;
        confirmPassword: string;
    };
    const equalPassword = password === confirmPassword;
    const hasThisEmail = await userService.hasThisEmail(email);
    if (!email || !password || !equalPassword) {
        res.sendStatus(400);
    } else if (hasThisEmail) {
        res.sendStatus(409);
    } else {
        try {
            await userService.signup(email, password);
            res.sendStatus(201);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
}

export async function signin() {}

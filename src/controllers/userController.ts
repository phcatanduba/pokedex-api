import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';
import * as sessionService from '../services/sessionService';

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

export async function signin(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
        res.sendStatus(400);
    } else {
        try {
            const isAuthorized = await userService.verifyEmailAndPassword(
                email,
                password
            );

            if (isAuthorized) {
                const token = await sessionService.create(email);
                res.send({ token }).status(200);
            } else {
                res.sendStatus(401);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const isAValidToken = await userService.isAValidToken(
            req.headers.authorization
        );
        if (!isAValidToken) {
            res.sendStatus(400);
        } else {
            next();
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function addPokemon(req: Request, res: Response) {
    const id: number = +req.params.id;
    try {
        const hasThisPokemon = await userService.addPokemon(id);
        if (!hasThisPokemon) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

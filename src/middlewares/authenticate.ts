import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

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
            res.sendStatus(401);
        } else {
            res.locals.user = isAValidToken;
            next();
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

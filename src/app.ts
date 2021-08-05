import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import * as userController from './controllers/userController';
import * as pokemonController from './controllers/pokemonController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signup);

app.post('/sign-in', userController.signin);

app.post(
    '/my-pokemons/:id/add',
    userController.authenticate,
    pokemonController.add
);

export async function init() {
    await connectDatabase();
}

export default app;

import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import * as userController from './controllers/userController';
import * as middleware from './middlewares/authenticate';
import { getRepository } from 'typeorm';
import Pokemon from './entities/Pokemon';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signup);

app.post('/sign-in', userController.signin);

app.post(
    '/my-pokemons/:id/add',
    middleware.authenticate,
    userController.addPokemon
);

app.post(
    '/my-pokemons/:id/remove',
    middleware.authenticate,
    userController.removePokemon
);

app.get('/pokemons', middleware.authenticate, userController.getPokemons);

app.get('/popular', async (req, res) => {
    for (let i = 1; i <= 150; i++) {
        console.log(i + ' ja foi');
        const newPokemon: any = {};
        const pokeapi = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokes = pokeapi.data;
        const morePokes = await axios.get(
            `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${pokes.name}`
        );
        newPokemon.name = pokes.name;
        newPokemon.number = pokes.id;
        newPokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
        newPokemon.weight = pokes.weight;
        newPokemon.height = pokes.height;
        newPokemon.baseExp = pokes.base_experience;
        newPokemon.description = morePokes.data.info.description;
        await getRepository(Pokemon).insert(newPokemon);
    }
    res.sendStatus(200);
});

export async function init() {
    await connectDatabase();
}

export default app;

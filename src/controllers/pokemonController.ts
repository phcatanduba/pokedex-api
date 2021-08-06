import { Request, Response } from 'express';

import * as pokemonService from '../services/pokemonService';
import Pokemon from '../entities/Pokemon';

export async function add(req: Request, res: Response) {
    const id: number = +req.params.id;
    req.body.pokemonId = id;
    req.body.inMyPokemons = true;

    const addPokemon = req.body as Pokemon;
    try {
        await pokemonService.add(addPokemon);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

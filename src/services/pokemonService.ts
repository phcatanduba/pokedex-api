import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { createPokemon } from '../interfaces/createPokemonInterface';
import Pokemon from '../entities/Pokemon';

export async function add(pokemon: createPokemon) {
    await getRepository(Pokemon).insert(pokemon);
}

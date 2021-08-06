import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Pokemon from './Pokemon';
import User from './User';

@Entity('userpokemon')
export default class UserPokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usersId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.id)
    pokemon: Pokemon;
}

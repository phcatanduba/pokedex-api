import {MigrationInterface, QueryRunner} from "typeorm";

export class PokemonEntityCreated1628212752962 implements MigrationInterface {
    name = 'PokemonEntityCreated1628212752962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "pokemonId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "pokemonId"`);
    }

}

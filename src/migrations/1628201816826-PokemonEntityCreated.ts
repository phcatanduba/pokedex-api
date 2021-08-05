import {MigrationInterface, QueryRunner} from "typeorm";

export class PokemonEntityCreated1628201816826 implements MigrationInterface {
    name = 'PokemonEntityCreated1628201816826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pokemons"`);
    }

}

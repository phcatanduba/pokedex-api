import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovingColumn1628230679318 implements MigrationInterface {
    name = 'RemovingColumn1628230679318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

}

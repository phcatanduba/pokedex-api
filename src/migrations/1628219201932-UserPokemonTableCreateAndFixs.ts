import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPokemonTableCreateAndFixs1628219201932 implements MigrationInterface {
    name = 'UserPokemonTableCreateAndFixs1628219201932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userpokemon" ("id" SERIAL NOT NULL, "usersId" integer NOT NULL, "pokemonId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_2e563efa25f1cc7483641bc038f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "pokemonId"`);
        await queryRunner.query(`ALTER TABLE "userpokemon" ADD CONSTRAINT "FK_a02e58c47582d822c8f49e7044e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userpokemon" ADD CONSTRAINT "FK_aac1b3d9681ac09f1d7d84d24e2" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userpokemon" DROP CONSTRAINT "FK_aac1b3d9681ac09f1d7d84d24e2"`);
        await queryRunner.query(`ALTER TABLE "userpokemon" DROP CONSTRAINT "FK_a02e58c47582d822c8f49e7044e"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "pokemonId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "userpokemon"`);
    }

}

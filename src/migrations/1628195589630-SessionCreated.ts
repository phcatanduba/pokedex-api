import {MigrationInterface, QueryRunner} from "typeorm";

export class SessionCreated1628195589630 implements MigrationInterface {
    name = 'SessionCreated1628195589630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "usersId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}

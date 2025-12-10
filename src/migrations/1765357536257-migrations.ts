import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1765357536257 implements MigrationInterface {
    name = 'Migrations1765357536257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "booking_date" TIMESTAMP(3) NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destination" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "price" integer NOT NULL, "quota" integer NOT NULL, "booked" integer NOT NULL, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tourist_trip" ("id" SERIAL NOT NULL, "userId" uuid, "tripId" uuid, CONSTRAINT "REL_56a4bda5acec8444b763049d3f" UNIQUE ("userId"), CONSTRAINT "REL_f0e5fdb7f3cbd1d133b0b67e66" UNIQUE ("tripId"), CONSTRAINT "PK_e4b0a019beb14227f43096bd820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('owner', 'employee', 'tourist')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'tourist', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_destionations_destination" ("tripId" uuid NOT NULL, "destinationId" uuid NOT NULL, CONSTRAINT "PK_9f959e0de3caab845787af9eef4" PRIMARY KEY ("tripId", "destinationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aa666df47b5ed7aa4ff1aa24cb" ON "trip_destionations_destination" ("tripId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9e91149f25aba32bdaab804a8" ON "trip_destionations_destination" ("destinationId") `);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" ADD CONSTRAINT "FK_56a4bda5acec8444b763049d3f7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" ADD CONSTRAINT "FK_f0e5fdb7f3cbd1d133b0b67e663" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_destionations_destination" ADD CONSTRAINT "FK_aa666df47b5ed7aa4ff1aa24cb1" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trip_destionations_destination" ADD CONSTRAINT "FK_f9e91149f25aba32bdaab804a83" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_destionations_destination" DROP CONSTRAINT "FK_f9e91149f25aba32bdaab804a83"`);
        await queryRunner.query(`ALTER TABLE "trip_destionations_destination" DROP CONSTRAINT "FK_aa666df47b5ed7aa4ff1aa24cb1"`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" DROP CONSTRAINT "FK_f0e5fdb7f3cbd1d133b0b67e663"`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" DROP CONSTRAINT "FK_56a4bda5acec8444b763049d3f7"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9e91149f25aba32bdaab804a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa666df47b5ed7aa4ff1aa24cb"`);
        await queryRunner.query(`DROP TABLE "trip_destionations_destination"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "tourist_trip"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "destination"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}

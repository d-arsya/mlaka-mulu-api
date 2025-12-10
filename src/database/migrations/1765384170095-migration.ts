import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765384170095 implements MigrationInterface {
    name = 'Migration1765384170095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "booking_date" TIMESTAMP(3) NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destination" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "price" integer NOT NULL, "quota" integer NOT NULL DEFAULT '0', "booked" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tourist_trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "tripId" uuid, CONSTRAINT "REL_56a4bda5acec8444b763049d3f" UNIQUE ("userId"), CONSTRAINT "REL_f0e5fdb7f3cbd1d133b0b67e66" UNIQUE ("tripId"), CONSTRAINT "PK_e4b0a019beb14227f43096bd820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('owner', 'employee', 'tourist')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'tourist', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_destinations_destination" ("tripId" uuid NOT NULL, "destinationId" uuid NOT NULL, CONSTRAINT "PK_b7c6bf9dca6e10c45f3321b8fc7" PRIMARY KEY ("tripId", "destinationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35d22f42405fb70d8de9e32a79" ON "trip_destinations_destination" ("tripId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d1c8914cc8dd1966c2e98fddb5" ON "trip_destinations_destination" ("destinationId") `);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" ADD CONSTRAINT "FK_56a4bda5acec8444b763049d3f7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" ADD CONSTRAINT "FK_f0e5fdb7f3cbd1d133b0b67e663" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_destinations_destination" ADD CONSTRAINT "FK_35d22f42405fb70d8de9e32a793" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trip_destinations_destination" ADD CONSTRAINT "FK_d1c8914cc8dd1966c2e98fddb5b" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_destinations_destination" DROP CONSTRAINT "FK_d1c8914cc8dd1966c2e98fddb5b"`);
        await queryRunner.query(`ALTER TABLE "trip_destinations_destination" DROP CONSTRAINT "FK_35d22f42405fb70d8de9e32a793"`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" DROP CONSTRAINT "FK_f0e5fdb7f3cbd1d133b0b67e663"`);
        await queryRunner.query(`ALTER TABLE "tourist_trip" DROP CONSTRAINT "FK_56a4bda5acec8444b763049d3f7"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1c8914cc8dd1966c2e98fddb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35d22f42405fb70d8de9e32a79"`);
        await queryRunner.query(`DROP TABLE "trip_destinations_destination"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "tourist_trip"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "destination"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}

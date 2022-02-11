-- AlterTable
CREATE SEQUENCE "distributor_id_seq";
ALTER TABLE "Distributor" ALTER COLUMN "id" SET DEFAULT nextval('distributor_id_seq');
ALTER SEQUENCE "distributor_id_seq" OWNED BY "Distributor"."id";

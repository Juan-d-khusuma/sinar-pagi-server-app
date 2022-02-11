/*
  Warnings:

  - Added the required column `data` to the `Debt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "date" TEXT NOT NULL;

/*
  Warnings:

  - The primary key for the `BuyingDiscount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BuyingDiscount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SellingDiscount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SellingDiscount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `categoryId` on the `ProductCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "BuyingDiscount" DROP CONSTRAINT "BuyingDiscount_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BuyingDiscount_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE "buyingprice_id_seq";
ALTER TABLE "BuyingPrice" ALTER COLUMN "id" SET DEFAULT nextval('buyingprice_id_seq');
ALTER SEQUENCE "buyingprice_id_seq" OWNED BY "BuyingPrice"."id";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId", "categoryId");

-- AlterTable
ALTER TABLE "SellingDiscount" DROP CONSTRAINT "SellingDiscount_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SellingDiscount_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE "sellingprice_id_seq";
ALTER TABLE "SellingPrice" ALTER COLUMN "id" SET DEFAULT nextval('sellingprice_id_seq');
ALTER SEQUENCE "sellingprice_id_seq" OWNED BY "SellingPrice"."id";

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

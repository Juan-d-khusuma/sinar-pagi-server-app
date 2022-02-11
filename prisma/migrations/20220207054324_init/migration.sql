/*
  Warnings:

  - You are about to drop the `Discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductDiscount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductDiscount" DROP CONSTRAINT "ProductDiscount_discountId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDiscount" DROP CONSTRAINT "ProductDiscount_productId_fkey";

-- DropTable
DROP TABLE "Discount";

-- DropTable
DROP TABLE "ProductDiscount";

-- CreateTable
CREATE TABLE "BuyingDiscount" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "BuyingDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellingDiscount" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "SellingDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyingPrice" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "BuyingPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellingPrice" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "SellingPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuyingDiscount" ADD CONSTRAINT "BuyingDiscount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingDiscount" ADD CONSTRAINT "SellingDiscount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyingPrice" ADD CONSTRAINT "BuyingPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingPrice" ADD CONSTRAINT "SellingPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

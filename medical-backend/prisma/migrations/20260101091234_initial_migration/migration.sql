-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('CONTINUE', 'DISCONTINUE');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('NORMAL', 'SERVICE');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('NORMAL', 'CONTROLLED', 'SCHEDULED');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gstNo" TEXT NOT NULL,
    "DLno" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'CONTINUE',
    "type" "ProductType" NOT NULL DEFAULT 'NORMAL',
    "itemType" "ItemType" NOT NULL DEFAULT 'NORMAL',
    "packing" TEXT,
    "unitPrimary" TEXT NOT NULL,
    "unitSecondary" TEXT,
    "mrp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "purchaseRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rateA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hsnSac" TEXT,
    "gstPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_companyId_key" ON "Product"("name", "companyId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `PurchaseBill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `totalGST` on the `PurchaseBill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `roundOff` on the `PurchaseBill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `netAmount` on the `PurchaseBill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `purchaseRate` on the `PurchaseBillItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `mrp` on the `PurchaseBillItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `gstPercent` on the `PurchaseBillItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `gstAmount` on the `PurchaseBillItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `totalAmount` on the `PurchaseBillItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - Added the required column `TotalAmount` to the `SaleBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `SaleBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `SaleBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `SaleBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemAmount` to the `SaleBillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `SaleBillItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PurchaseBill" ADD COLUMN     "cgstPayable" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "discount" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "sgstPayable" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "taxableAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "totalGST" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "roundOff" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "netAmount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "public"."PurchaseBillItem" ALTER COLUMN "purchaseRate" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "mrp" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "gstPercent" SET DATA TYPE INTEGER,
ALTER COLUMN "gstAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "public"."SaleBill" ADD COLUMN     "TotalAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "discount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."SaleBillItem" ADD COLUMN     "itemAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "mrp" DECIMAL(12,2) NOT NULL;

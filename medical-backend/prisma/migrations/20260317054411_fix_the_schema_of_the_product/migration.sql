/*
  Warnings:

  - You are about to drop the column `ConvCAS` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `askDose` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `centralName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `colorType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `decimal` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `gstPercent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `hsnSac` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `igst` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `localName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rateA` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rateB` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rateC` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrimary` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitSecondary` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "ConvCAS",
DROP COLUMN "askDose",
DROP COLUMN "category",
DROP COLUMN "centralName",
DROP COLUMN "colorType",
DROP COLUMN "cost",
DROP COLUMN "decimal",
DROP COLUMN "gstPercent",
DROP COLUMN "hsnSac",
DROP COLUMN "igst",
DROP COLUMN "itemType",
DROP COLUMN "localName",
DROP COLUMN "rateA",
DROP COLUMN "rateB",
DROP COLUMN "rateC",
DROP COLUMN "salt",
DROP COLUMN "status",
DROP COLUMN "type",
DROP COLUMN "unitPrimary",
DROP COLUMN "unitSecondary";

/*
  Warnings:

  - You are about to drop the column `purchaseRate` on the `Product` table. All the data in the column will be lost.
  - Added the required column `name` to the `template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "purchaseRate";

-- AlterTable
ALTER TABLE "public"."template" ADD COLUMN     "name" TEXT NOT NULL;

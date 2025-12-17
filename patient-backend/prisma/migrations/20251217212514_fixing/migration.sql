/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `Allergies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Allergies" DROP CONSTRAINT "Allergies_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Allergies" DROP COLUMN "appointmentId";

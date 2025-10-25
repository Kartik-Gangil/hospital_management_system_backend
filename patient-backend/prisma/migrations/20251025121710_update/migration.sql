/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_appointmentId_fkey";

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "appointmentId";

/*
  Warnings:

  - Added the required column `Time` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Appointment" ADD COLUMN     "Time" TIME NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

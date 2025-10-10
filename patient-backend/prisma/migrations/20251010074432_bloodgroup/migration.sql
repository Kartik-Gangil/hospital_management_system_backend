/*
  Warnings:

  - Made the column `Blood_group` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Patient" ALTER COLUMN "Blood_group" SET NOT NULL,
ALTER COLUMN "Blood_group" SET DEFAULT 'O-';

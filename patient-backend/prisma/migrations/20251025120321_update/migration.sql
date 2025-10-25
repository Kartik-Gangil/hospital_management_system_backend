/*
  Warnings:

  - The `document` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "document",
ADD COLUMN     "document" TEXT[];

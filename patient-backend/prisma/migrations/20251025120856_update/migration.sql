/*
  Warnings:

  - Changed the type of `document` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "document",
ADD COLUMN     "document" JSONB NOT NULL;

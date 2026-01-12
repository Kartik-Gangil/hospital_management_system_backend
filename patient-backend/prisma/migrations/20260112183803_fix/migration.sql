/*
  Warnings:

  - You are about to drop the column `Days` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `Intake` on the `Medicine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "Days",
DROP COLUMN "Intake";

/*
  Warnings:

  - You are about to drop the column `image_file` on the `Anterior` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "bloodGroup" ADD VALUE 'null';

-- AlterTable
ALTER TABLE "Anterior" DROP COLUMN "image_file";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT 'Receptionist';

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "Anterior_Drawing" JSONB,
ADD COLUMN     "Posterior_Drawing" JSONB;

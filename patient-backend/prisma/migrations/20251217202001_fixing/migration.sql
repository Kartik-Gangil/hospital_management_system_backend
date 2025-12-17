/*
  Warnings:

  - Added the required column `patientId` to the `Allergies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Allergies" ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

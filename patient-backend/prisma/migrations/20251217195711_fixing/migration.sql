/*
  Warnings:

  - The values [null] on the enum `bloodGroup` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `patientId` on the `Advise` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Allergies` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Anterior` table. All the data in the column will be lost.
  - You are about to drop the column `P_id` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `P_id` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Refraction` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Treatment` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Vision` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "bloodGroup_new" AS ENUM ('NULL', 'O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-');
ALTER TABLE "public"."Patient" ALTER COLUMN "Blood_group" DROP DEFAULT;
ALTER TABLE "Patient" ALTER COLUMN "Blood_group" TYPE "bloodGroup_new" USING ("Blood_group"::text::"bloodGroup_new");
ALTER TYPE "bloodGroup" RENAME TO "bloodGroup_old";
ALTER TYPE "bloodGroup_new" RENAME TO "bloodGroup";
DROP TYPE "public"."bloodGroup_old";
ALTER TABLE "Patient" ALTER COLUMN "Blood_group" SET DEFAULT 'NULL';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Advise" DROP CONSTRAINT "Advise_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Advise" DROP CONSTRAINT "Advise_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Allergies" DROP CONSTRAINT "Allergies_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Allergies" DROP CONSTRAINT "Allergies_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Anterior" DROP CONSTRAINT "Anterior_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Anterior" DROP CONSTRAINT "Anterior_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Complaint" DROP CONSTRAINT "Complaint_P_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Complaint" DROP CONSTRAINT "Complaint_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Diagnosis" DROP CONSTRAINT "Diagnosis_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Diagnosis" DROP CONSTRAINT "Diagnosis_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."History" DROP CONSTRAINT "History_P_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."History" DROP CONSTRAINT "History_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medicine" DROP CONSTRAINT "Medicine_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medicine" DROP CONSTRAINT "Medicine_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Posterior" DROP CONSTRAINT "Posterior_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Posterior" DROP CONSTRAINT "Posterior_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Refraction" DROP CONSTRAINT "Refraction_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Refraction" DROP CONSTRAINT "Refraction_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Treatment" DROP CONSTRAINT "Treatment_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Treatment" DROP CONSTRAINT "Treatment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vision" DROP CONSTRAINT "Vision_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vision" DROP CONSTRAINT "Vision_patientId_fkey";

-- AlterTable
ALTER TABLE "Advise" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Allergies" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Anterior" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "P_id";

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "P_id";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "Branch" TEXT,
ALTER COLUMN "Age" DROP NOT NULL,
ALTER COLUMN "Blood_group" SET DEFAULT 'NULL';

-- AlterTable
ALTER TABLE "Posterior" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Refraction" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Vision" DROP COLUMN "patientId";

-- CreateIndex
CREATE INDEX "Appointment_Appointment_date_idx" ON "Appointment"("Appointment_date");

-- CreateIndex
CREATE INDEX "Appointment_P_id_idx" ON "Appointment"("P_id");

-- CreateIndex
CREATE INDEX "Patient_Phone_idx" ON "Patient"("Phone");

-- CreateIndex
CREATE INDEX "Patient_FullName_idx" ON "Patient"("FullName");

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vision" ADD CONSTRAINT "Vision_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refraction" ADD CONSTRAINT "Refraction_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anterior" ADD CONSTRAINT "Anterior_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posterior" ADD CONSTRAINT "Posterior_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advise" ADD CONSTRAINT "Advise_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

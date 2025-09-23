/*
  Warnings:

  - Added the required column `appointmentId` to the `Complaint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Complaint" ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."History" ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Allergies" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allergies" TEXT[],
    "patientId" INTEGER NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vision" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "R_Distance_unaided" TEXT,
    "R_Distance_With_Pin_Hole" TEXT,
    "R_Distance_With_CT" TEXT,
    "R_Distance_With_PMT" TEXT,
    "R_Distance_with_previous_glasses" TEXT,
    "R_Distance_with_current_subjective" TEXT,
    "R_Near_unaided" TEXT,
    "R_Near_with_previous_glasses" TEXT,
    "R_Near_with_current_subjective" TEXT,
    "L_Distance_unaided" TEXT,
    "L_Distance_With_Pin_Hole" TEXT,
    "L_Distance_With_CT" TEXT,
    "L_Distance_With_PMT" TEXT,
    "L_Distance_with_previous_glasses" TEXT,
    "L_Distance_with_current_subjective" TEXT,
    "L_Near_unaided" TEXT,
    "L_Near_with_previous_glasses" TEXT,
    "L_Near_with_current_subjective" TEXT,
    "patientId" INTEGER NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Vision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Refraction" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER NOT NULL,
    "refractionType" TEXT,
    "R_D_SPH" TEXT,
    "R_D_CYL" TEXT,
    "R_D_AXIS" TEXT,
    "R_D_VA" TEXT,
    "R_N_SPH" TEXT,
    "R_N_CYL" TEXT,
    "R_N_AXIS" TEXT,
    "R_N_VA" TEXT,
    "L_D_SPH" TEXT,
    "L_D_CYL" TEXT,
    "L_D_AXIS" TEXT,
    "L_D_VA" TEXT,
    "L_N_SPH" TEXT,
    "L_N_CYL" TEXT,
    "L_N_AXIS" TEXT,
    "L_N_VA" TEXT,
    "Glass_Type" TEXT,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Refraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Anterior" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "R_Intraocular_pressure_NCT" TEXT,
    "R_Intraocular_pressure_Tonopen" TEXT,
    "R_Intraocular_pressure_AT" TEXT,
    "R_Eyelids" TEXT,
    "R_Eyelashes" TEXT,
    "R_Lacrimal_punctum" TEXT,
    "R_Orbit" TEXT,
    "R_Extraocular_movements" TEXT,
    "R_Eye_position" TEXT,
    "R_Sclera_episclera" TEXT,
    "R_Conjunctiva" TEXT,
    "R_Cornea" TEXT,
    "R_Anterior_chamber" TEXT,
    "R_Angles" TEXT,
    "R_Iris_pupil" TEXT,
    "R_Lens" TEXT,
    "R_Lacrimal_syringing" TEXT,
    "R_Gonioscopy" TEXT,
    "R_Others" TEXT,
    "L_Intraocular_pressure_NCT" TEXT,
    "L_Intraocular_pressure_Tonopen" TEXT,
    "L_Intraocular_pressure_AT" TEXT,
    "L_Eyelids" TEXT,
    "L_Eyelashes" TEXT,
    "L_Lacrimal_punctum" TEXT,
    "L_Orbit" TEXT,
    "L_Extraocular_movements" TEXT,
    "L_Eye_position" TEXT,
    "L_Sclera_episclera" TEXT,
    "L_Conjunctiva" TEXT,
    "L_Cornea" TEXT,
    "L_Anterior_chamber" TEXT,
    "L_Angles" TEXT,
    "L_Iris_pupil" TEXT,
    "L_Lens" TEXT,
    "L_Lacrimal_syringing" TEXT,
    "L_Gonioscopy" TEXT,
    "L_Others" TEXT,
    "patientId" INTEGER NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Anterior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Posterior" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Media" TEXT,
    "Vitreous" TEXT,
    "Retina" TEXT,
    "Optic_nerve_head" TEXT,
    "Choroid" TEXT,
    "Macula" TEXT,
    "Others" TEXT,
    "patientId" INTEGER NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Posterior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Diagnosis" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "R_eye" TEXT,
    "L_eye" TEXT,
    "Systemic" TEXT,
    "Others" TEXT,
    "patientId" INTEGER NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Advise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "message" TEXT,
    "appointmentId" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Advise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Treatment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "message" TEXT,
    "appointmentId" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicine" (
    "id" SERIAL NOT NULL,
    "Dose" TEXT NOT NULL,
    "Days" TEXT NOT NULL,
    "Intake" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Report" (
    "id" SERIAL NOT NULL,
    "document" TEXT[],
    "appointmentId" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."History" ADD CONSTRAINT "History_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Allergies" ADD CONSTRAINT "Allergies_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Allergies" ADD CONSTRAINT "Allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vision" ADD CONSTRAINT "Vision_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vision" ADD CONSTRAINT "Vision_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Refraction" ADD CONSTRAINT "Refraction_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Refraction" ADD CONSTRAINT "Refraction_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anterior" ADD CONSTRAINT "Anterior_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anterior" ADD CONSTRAINT "Anterior_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Posterior" ADD CONSTRAINT "Posterior_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Posterior" ADD CONSTRAINT "Posterior_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Advise" ADD CONSTRAINT "Advise_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Advise" ADD CONSTRAINT "Advise_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Treatment" ADD CONSTRAINT "Treatment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Treatment" ADD CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medicine" ADD CONSTRAINT "Medicine_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medicine" ADD CONSTRAINT "Medicine_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

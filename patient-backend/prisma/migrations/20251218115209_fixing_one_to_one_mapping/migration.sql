/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `Advise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Anterior` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Complaint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Diagnosis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Posterior` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Refraction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Treatment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Vision` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Advise_appointmentId_key" ON "Advise"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Anterior_appointmentId_key" ON "Anterior"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_appointmentId_key" ON "Complaint"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Diagnosis_appointmentId_key" ON "Diagnosis"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "History_appointmentId_key" ON "History"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_appointmentId_key" ON "Medicine"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Posterior_appointmentId_key" ON "Posterior"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Refraction_appointmentId_key" ON "Refraction"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_appointmentId_key" ON "Treatment"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Vision_appointmentId_key" ON "Vision"("appointmentId");

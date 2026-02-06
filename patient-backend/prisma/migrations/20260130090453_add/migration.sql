-- DropIndex
DROP INDEX "Refraction_appointmentId_key";

-- CreateTable
CREATE TABLE "Surgery" (
    "id" SERIAL NOT NULL,
    "SurgeryName" TEXT NOT NULL,
    "eye" TEXT,
    "message" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surgery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Surgery_appointmentId_idx" ON "Surgery"("appointmentId");

-- CreateIndex
CREATE INDEX "Refraction_appointmentId_idx" ON "Refraction"("appointmentId");

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

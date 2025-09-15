-- CreateEnum
CREATE TYPE "public"."gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "public"."bloodGroup" AS ENUM ('O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-');

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" SERIAL NOT NULL,
    "FullName" TEXT NOT NULL,
    "Gender" "public"."gender" NOT NULL,
    "Phone" TEXT NOT NULL,
    "DOB" DATE NOT NULL,
    "Reffered_by" TEXT,
    "Age" INTEGER NOT NULL,
    "Insurance" TEXT,
    "Address" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Blood_group" "public"."bloodGroup" NOT NULL,
    "Emgr_name" TEXT NOT NULL,
    "Emgr_mobile_no" TEXT NOT NULL,
    "document" TEXT[],

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Complaint" (
    "id" TEXT NOT NULL,
    "P_id" INTEGER NOT NULL,
    "D_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" TEXT NOT NULL,
    "P_id" INTEGER NOT NULL,
    "D_id" TEXT NOT NULL,
    "Appointment_date" DATE NOT NULL,
    "complaint" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."History" (
    "id" TEXT NOT NULL,
    "P_id" INTEGER NOT NULL,
    "D_id" TEXT NOT NULL,
    "Systemic_illness" TEXT NOT NULL,
    "Treatment_Histroy" TEXT NOT NULL,
    "Dite_Histroy" TEXT NOT NULL,
    "Family_Histroy" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_P_id_fkey" FOREIGN KEY ("P_id") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_P_id_fkey" FOREIGN KEY ("P_id") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."History" ADD CONSTRAINT "History_P_id_fkey" FOREIGN KEY ("P_id") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

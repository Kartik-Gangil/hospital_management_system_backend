-- CreateEnum
CREATE TYPE "public"."designation" AS ENUM ('CONSULTANT', 'Admin', 'Front_Desk', 'Receptionist', 'Doctor');

-- CreateEnum
CREATE TYPE "public"."gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "public"."doctor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Department" TEXT NOT NULL DEFAULT 'Ophthalmology',
    "Designation" "public"."designation" NOT NULL,
    "Gender" "public"."gender" NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Document" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_email_key" ON "public"."doctor"("email");

/*
  Warnings:

  - You are about to drop the column `Choroid` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Macula` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Media` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Optic_nerve_head` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Others` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Retina` on the `Posterior` table. All the data in the column will be lost.
  - You are about to drop the column `Vitreous` on the `Posterior` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Medicine" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Posterior" DROP COLUMN "Choroid",
DROP COLUMN "Macula",
DROP COLUMN "Media",
DROP COLUMN "Optic_nerve_head",
DROP COLUMN "Others",
DROP COLUMN "Retina",
DROP COLUMN "Vitreous",
ADD COLUMN     "L_Choroid" TEXT,
ADD COLUMN     "L_Macula" TEXT,
ADD COLUMN     "L_Media" TEXT,
ADD COLUMN     "L_Optic_nerve_head" TEXT,
ADD COLUMN     "L_Others" TEXT,
ADD COLUMN     "L_Retina" TEXT,
ADD COLUMN     "L_Vitreous" TEXT,
ADD COLUMN     "R_Choroid" TEXT,
ADD COLUMN     "R_Macula" TEXT,
ADD COLUMN     "R_Media" TEXT,
ADD COLUMN     "R_Optic_nerve_head" TEXT,
ADD COLUMN     "R_Others" TEXT,
ADD COLUMN     "R_Retina" TEXT,
ADD COLUMN     "R_Vitreous" TEXT;

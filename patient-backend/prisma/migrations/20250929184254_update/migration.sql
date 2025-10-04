-- AlterTable
ALTER TABLE "public"."Complaint" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Medicine" ADD COLUMN     "medicine" TEXT NOT NULL DEFAULT '';

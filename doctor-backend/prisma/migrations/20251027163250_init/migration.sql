-- AlterEnum
ALTER TYPE "public"."designation" ADD VALUE 'Developer';

-- AlterTable
ALTER TABLE "public"."doctor" ALTER COLUMN "Phone" DROP NOT NULL,
ALTER COLUMN "Address" DROP NOT NULL,
ALTER COLUMN "State" DROP NOT NULL,
ALTER COLUMN "City" DROP NOT NULL,
ALTER COLUMN "Document" DROP NOT NULL;

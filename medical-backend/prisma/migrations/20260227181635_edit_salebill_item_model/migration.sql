-- DropForeignKey
ALTER TABLE "public"."PurchaseBillItem" DROP CONSTRAINT "PurchaseBillItem_billId_fkey";

-- AddForeignKey
ALTER TABLE "public"."PurchaseBillItem" ADD CONSTRAINT "PurchaseBillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."PurchaseBill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

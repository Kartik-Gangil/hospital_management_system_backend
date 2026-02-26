-- AlterTable
ALTER TABLE "public"."SaleBillItem" ADD COLUMN     "stockId" TEXT;

-- CreateIndex
CREATE INDEX "SaleBillItem_stockId_idx" ON "public"."SaleBillItem"("stockId");

-- AddForeignKey
ALTER TABLE "public"."SaleBillItem" ADD CONSTRAINT "SaleBillItem_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."Stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleBillItem" ADD CONSTRAINT "SaleBillItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

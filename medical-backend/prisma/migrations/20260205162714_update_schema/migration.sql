-- CreateTable
CREATE TABLE "public"."SaleBill" (
    "id" TEXT NOT NULL,
    "Customer_Name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SaleBillItem" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SaleBillItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaleBillItem_billId_idx" ON "public"."SaleBillItem"("billId");

-- AddForeignKey
ALTER TABLE "public"."SaleBillItem" ADD CONSTRAINT "SaleBillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."SaleBill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.put('/saleBill/:id', async (req, res) => {
    const { id } = req.params;
    const { name, amount, phone, TotalAmount, discount, items } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {

            // 1️⃣ Get existing sale items
            const oldItems = await tx.saleBillItem.findMany({
                where: { billId: id }
            });

            // 2️⃣ Restore stock EXACTLY
            for (const item of oldItems) {
                await tx.stock.update({
                    where: { id: item.stockId },
                    data: {
                        quantity: {
                            increment: item.quantity
                        }
                    }
                });
            }

            // 3️⃣ Delete old items
            await tx.saleBillItem.deleteMany({
                where: { billId: id }
            });

            // 4️⃣ Update main bill
            await tx.saleBill.update({
                where: { id },
                data: {
                    Customer_Name: name,
                    amount,
                    phone,
                    TotalAmount,
                    discount
                }
            });

            // 5️⃣ Re-deduct stock using FEFO
            for (const item of items) {
                let remainingQty = item.quantity;

                const stocks = await tx.stock.findMany({
                    where: {
                        productId: item.productId,
                        quantity: { gt: 0 }
                    },
                    orderBy: {
                        expiryDate: 'asc'
                    }
                });

                const totalAvailable = stocks.reduce(
                    (sum, s) => sum + s.quantity, 0
                );

                if (totalAvailable < remainingQty) {
                    throw new Error(
                        `Insufficient stock for product ${item.productId}`
                    );
                }

                for (const stock of stocks) {
                    if (remainingQty === 0) break;

                    const deductQty = Math.min(stock.quantity, remainingQty);

                    // Deduct stock
                    await tx.stock.update({
                        where: { id: stock.id },
                        data: {
                            quantity: stock.quantity - deductQty
                        }
                    });

                    // Save item with stockId 🔥
                    await tx.saleBillItem.create({
                        data: {
                            billId: id,
                            productId: item.productId,
                            stockId: stock.id,
                            quantity: deductQty,
                            itemAmount: item.amount,
                            mrp: item.mrp
                        }
                    });

                    remainingQty -= deductQty;
                }
            }

            return { success: true };
        });

        res.status(200).json({
            message: "Sale bill updated successfully",
            data: result
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message
        });
    }
});

router.put('/purchaseBill/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { invoiceDate, supplierId, discount, roundOff, items } = req.body;

        const result = await prisma.$transaction(async (tx) => {
            // Fetch existing bill
            const existingBill = await tx.purchaseBill.findUnique({
                where: { id: parseInt(id) },
                include: { items: true }
            });

            if (!existingBill) {
                throw new Error('Purchase bill not found');
            }

            // Reverse old stock entries
            for (const item of existingBill.items) {
                const totalQty = item.quantity + item.freeQty;
                const stock = await tx.stock.findUnique({
                    where: {
                        productId_batchNo: {
                            productId: item.productId,
                            batchNo: item.batchNo
                        }
                    }
                });
                if (stock) {
                    await tx.stock.update({
                        where: { id: stock.id },
                        data: { quantity: stock.quantity - totalQty }
                    });
                }
            }

            // Delete old bill items
            await tx.purchaseBillItem.deleteMany({
                where: { billId: parseInt(id) }
            });

            // Calculate new totals
            let totalTaxable = 0, totalGST = 0, totalAmount = 0;
            const billItemsData = items.map((item) => {
                const taxable = item.quantity * item.purchaseRate;
                const gstAmount = (taxable * item.gstPercent) / 100;
                const total = taxable + gstAmount;
                totalTaxable += taxable;
                totalGST += gstAmount;
                totalAmount += total;
                return {
                    productId: item.productId,
                    batchNo: item.batchNo,
                    expiryDate: new Date(item.expiryDate),
                    quantity: parseInt(item.quantity),
                    freeQty: parseInt(item.freeQty) || 0,
                    purchaseRate: parseInt(item.purchaseRate),
                    mrp: parseInt(item.mrp),
                    taxableAmount: parseInt(taxable),
                    gstPercent: parseInt(item.gstPercent),
                    gstAmount: parseInt(gstAmount),
                    totalAmount: parseInt(total)
                };
            });

            const cgstPayable = totalGST / 2;
            const sgstPayable = totalGST / 2;
            const netAmount = totalAmount - discount + roundOff;

            // Update bill
            const updatedBill = await tx.purchaseBill.update({
                where: { id: parseInt(id) },
                data: {
                    invoiceNo,
                    invoiceDate: new Date(invoiceDate),
                    supplierId,
                    taxableAmount: totalTaxable,
                    totalGST,
                    cgstPayable,
                    sgstPayable,
                    discount,
                    roundOff,
                    netAmount,
                    totalAmount,
                    items: { create: billItemsData }
                },
                include: { items: true }
            });

            // Add new stock entries
            for (const item of updatedBill.items) {
                const totalQty = item.quantity + item.freeQty;
                const existingStock = await tx.stock.findUnique({
                    where: {
                        productId_batchNo: {
                            productId: item.productId,
                            batchNo: item.batchNo
                        }
                    }
                });
                if (existingStock) {
                    await tx.stock.update({
                        where: { id: existingStock.id },
                        data: {
                            quantity: existingStock.quantity + totalQty,
                            purchaseRate: item.purchaseRate,
                            mrp: item.mrp
                        }
                    });
                } else {
                    await tx.stock.create({
                        data: {
                            productId: item.productId,
                            batchNo: item.batchNo,
                            expiryDate: item.expiryDate,
                            quantity: totalQty,
                            purchaseRate: item.purchaseRate,
                            mrp: item.mrp
                        }
                    });
                }
            }

            return updatedBill;
        });

        res.json({ success: true, message: 'Purchase bill updated successfully', data: result });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
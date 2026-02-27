const express = require('express');
const prisma = require('../controller/DB');
const router = express.Router();


router.delete('/saleBill/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.$transaction(async (tx) => {

            // 1️⃣ Get all sale items
            const items = await tx.saleBillItem.findMany({
                where: { billId: id }
            });

            if (!items.length) {
                throw new Error("Sale bill not found");
            }

            // 2️⃣ Restore stock batch-wise (only if stockId exists)
            for (const item of items) {
                if (!item.stockId) continue;

                await tx.stock.update({
                    where: { id: item.stockId },
                    data: {
                        quantity: {
                            increment: item.quantity
                        }
                    }
                });
            }

            // 3️⃣ Delete sale bill (items auto deleted via cascade)
            await tx.saleBill.delete({
                where: { id }
            });

        });

        res.status(200).json({
            success: true,
            message: "Sale bill deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.delete('/purchaseBill/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.$transaction(async (tx) => {

            // 1️⃣ Get purchase bill items
            const items = await tx.purchaseBillItem.findMany({
                where: { billId: id }
            });

            if (!items.length) {
                throw new Error("Purchase bill not found");
            }

            // 2️⃣ Reverse stock
            for (const item of items) {

                const stock = await tx.stock.findUnique({
                    where: {
                        productId_batchNo: {
                            productId: item.productId,
                            batchNo: item.batchNo
                        }
                    }
                });

                if (!stock) {
                    throw new Error(
                        `Stock not found for product ${item.productId}, batch ${item.batchNo}`
                    );
                }

                const updatedQty = stock.quantity - item.quantity;

                if (updatedQty < 0) {
                    throw new Error(
                        `Stock underflow for product ${item.productId}`
                    );
                }

                // If stock becomes 0 → delete row
                if (updatedQty === 0) {
                    await tx.stock.delete({
                        where: { id: stock.id }
                    });
                } else {
                    await tx.stock.update({
                        where: { id: stock.id },
                        data: { quantity: updatedQty }
                    });
                }
            }

            // 3️⃣ Delete purchase bill (items auto deleted via cascade if enabled)
            await tx.purchaseBill.delete({
                where: { id }
            });

        });

        res.status(200).json({
            success: true,
            message: "Purchase bill deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


module.exports = router;
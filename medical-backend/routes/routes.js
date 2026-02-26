const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.post('/createCompany', async (req, res) => {
    try {
        const { name, address, phone, email, gstNo, DLno } = req.body;
        // Logic to create a company using the provided details
        await prisma.supplier.create({
            data: {
                name,
                address,
                phone,
                email,
                gstNo,
                DLno
            }
        });
        return res.status(201).json({ message: "Company created successfully" });
    } catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).json({ error: "Failed to create company" });
    }
})



router.post('/addMedicine', async (req, res) => {
    try {
        const { name, status, type, itemType, supplierId, packing, unitPrimary, unitSecondary, mrp, rateA, rateB, rateC, Prate, cost, ConvCASE, ConvCAS, sgst, igst, cgst, localName, centralName, category, salt, colorType, askDose, company, decimal, hsnSac } = req.body;
        await prisma.product.create({
            data: {
                name,
                status,
                type,
                itemType,
                packing,
                unitPrimary,
                unitSecondary,
                mrp: parseFloat(mrp),
                rateB: parseFloat(rateB),
                rateC: parseFloat(rateC),
                Prate: parseFloat(Prate),
                cost: parseFloat(cost),
                ConvCASE: parseFloat(ConvCASE),
                ConvCAS: parseFloat(ConvCAS),
                sgst: parseFloat(sgst),
                igst: parseFloat(igst),
                cgst: parseFloat(cgst),
                decimal: parseInt(decimal),
                rateA: parseFloat(rateA),
                // gstPercent: parseFloat(gstPercent),
                localName,
                centralName,
                category,
                salt,
                colorType,
                askDose,
                company,
                hsnSac,
                supplierId
            }
        })
        return res.status(201).json({ message: "Product created successfully" });

    } catch (error) {
        console.error("Error creating Product:", error);
        return res.status(500).json({ error: "Failed to create Product" });
    }
})

router.post('/PurchaseBill', async (req, res) => {
    const {
        invoiceNo,
        invoiceDate,
        supplierId,
        roundOff = 0,
        discount = 0,
        items
    } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {

            let totalTaxable = 0;
            let totalGST = 0;
            let totalAmount = 0;

            // 🔹 Prepare bill items
            const billItemsData = items.map((item) => {

                const taxable = item.quantity * item.purchaseRate;
                const gstAmount = (taxable * item.gstPercent) / 100;
                const total = taxable + gstAmount;

                // 🔢 accumulate bill totals
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

                    taxableAmount: parseInt(taxable), // ✅ item-level
                    gstPercent: parseInt(item.gstPercent),
                    gstAmount: parseInt(gstAmount),
                    totalAmount: parseInt(total)
                };
            });

            const cgstPayable = totalGST / 2;
            const sgstPayable = totalGST / 2;

            const netAmount =
                totalAmount - discount + roundOff;

            // 🔹 Create Purchase Bill
            const bill = await tx.purchaseBill.create({
                data: {
                    invoiceNo,
                    invoiceDate: new Date(invoiceDate),
                    supplierId,

                    taxableAmount : totalTaxable,
                    totalGST,
                    cgstPayable,
                    sgstPayable,
                    discount,
                    roundOff,
                    netAmount,
                    totalAmount,
                    items: {
                        create: billItemsData
                    }
                },
                include: {
                    items: true
                }
            });

            // 🔹 Update Stock
            for (const item of bill.items) {

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

            return bill;
        });

        res.status(201).json({
            success: true,
            message: "Purchase bill created & stock updated",
            data: result
        });

    } catch (error) {
        console.error("Error creating Purchase Bill:", error);
        res.status(500).json({ error: "Failed to create Purchase Bill" });
    }
});

router.post('/addTemplate', async (req, res) => {
    try {
        const { name, description } = req.body;
        await prisma.template.create({
            data: {
                name,
                description
            }
        })
        return res.status(201).json({ message: "Template created successfully" });
    } catch (error) {
        console.error("Error creating template:", error);
        return res.status(500).json({ error: "Failed to create template" });
    }
})

// get routes

router.get('/getSuppliers', async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return res.status(200).json(suppliers);
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return res.status(500).json({ error: "Failed to fetch suppliers" });
    }
})

router.get('/getProduct', async (req, res) => {
    try {
        const Product = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                mrp:true
            }
        });
        return res.status(200).json(Product);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" });
    }
})

router.get('/getTemplates', async (req, res) => {
    try {
        const template = await prisma.template.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return res.status(200).json(template);
    } catch (error) {
        console.error("Error fetching template:", error);
        return res.status(500).json({ error: "Failed to fetch template" });
    }
})

router.get('/getTemplatesData/:id', async (req, res) => {
    try {
        const template = await prisma.template.findUnique({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(template);
    } catch (error) {
        console.error("Error fetching template:", error);
        return res.status(500).json({ error: "Failed to fetch template" });
    }
})

// salebill API

router.post('/saleBill', async (req, res) => {
    const { name, amount, phone, TotalAmount, discount, items } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {

            // 1️⃣ Create sale bill
            const saleBill = await tx.saleBill.create({
                data: {
                    Customer_Name: name,
                    amount,
                    phone,
                    TotalAmount,
                    discount
                }
            });

            // 2️⃣ Process each product
            for (const item of items) {
                let remainingQty = item.quantity;

                // 3️⃣ Fetch stock batches (FEFO)
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

                // ❌ Not enough stock
                if (totalAvailable < remainingQty) {
                    throw new Error(
                        `Insufficient stock for product ${item.productId}`
                    );
                }

                // 4️⃣ Deduct batch-wise
                for (const stock of stocks) {
                    if (remainingQty === 0) break;

                    const deductQty = Math.min(stock.quantity, remainingQty);

                    await tx.stock.update({
                        where: { id: stock.id },
                        data: {
                            quantity: stock.quantity - deductQty
                        }
                    });

                    // 5️⃣ Save sale item (batch-wise)
                    await tx.saleBillItem.create({
                        data: {
                            billId: saleBill.id,
                            productId: item.productId,
                            quantity: deductQty,
                            itemAmount: item.amount,
                            mrp: parseInt(item.mrp),
                            stockId: stock.id
                        }
                    });

                    remainingQty -= deductQty;
                }
            }

            return saleBill;
        });

        res.status(201).json({
            success: true,
            message: "Sale completed successfully",
            data: result
        });

    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            error: error.message
        });
    }
});





module.exports = router;
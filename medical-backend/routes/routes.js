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
        items
    } = req.body

    try {
        const result = await prisma.$transaction(async (tx) => {

            let totalAmount = 0
            let totalGST = 0

            // 🔹 Prepare bill items
            const billItemsData = items.map((item) => {
                const taxableAmount = item.quantity * item.purchaseRate
                const gstAmount = taxableAmount * (item.gstPercent / 100)
                const total = taxableAmount + gstAmount

                totalAmount += total
                totalGST += gstAmount

                return {
                    productId: item.productId,
                    batchNo: item.batchNo,
                    expiryDate: new Date(item.expiryDate),
                    quantity: parseInt(item.quantity),
                    freeQty: parseInt(item.freeQty) || 0,
                    purchaseRate: parseFloat(item.purchaseRate),
                    mrp: parseFloat(item.mrp),
                    gstPercent: parseFloat(item.gstPercent),
                    taxableAmount,
                    gstAmount,
                    totalAmount: total
                }
            })

            // 🔹 Create Purchase Bill
            const bill = await tx.purchaseBill.create({
                data: {
                    invoiceNo,
                    invoiceDate: new Date(invoiceDate),
                    supplierId,

                    totalAmount,
                    totalGST,
                    roundOff,
                    netAmount: totalAmount + roundOff,

                    items: {
                        create: billItemsData
                    }
                },
                include: {
                    items: true
                }
            })

            return bill
        })

        res.status(201).json({
            success: true,
            data: result
        })
    }
    catch (error) {
        console.error("Error creating Product:", error);
        return res.status(500).json({ error: "Failed to create Product" });
    }
})


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
                name: true
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
        const template = await prisma.template.findMany();
        return res.status(200).json(template);
    } catch (error) {
        console.error("Error fetching template:", error);
        return res.status(500).json({ error: "Failed to fetch template" });
    }
})




module.exports = router;
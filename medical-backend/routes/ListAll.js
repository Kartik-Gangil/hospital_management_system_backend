const express = require('express');
const prisma = require('../controller/DB');
const router = express.Router();

router.get('/saleBills', async (req, res) => {
    try {
        const bills = await prisma.saleBill.findMany({
            include: {
                items: {
                    include: {
                        stock: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: bills
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.get('/purchaseBills', async (req, res) => {
    try {
        const bills = await prisma.purchaseBill.findMany({
            include: {
                items: {
                    include: {
                        stock: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: bills
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


router.get('/salebill/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const bill = await prisma.saleBill.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        stock: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!bill) {
            return res.status(404).json({
                error: "Sale bill not found"
            });
        }

        res.status(200).json({
            success: true,
            data: bill
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.get('/purchasebill/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const bill = await prisma.purchaseBill.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        stock: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!bill) {
            return res.status(404).json({
                error: "Purchase bill not found"
            });
        }

        res.status(200).json({
            success: true,
            data: bill
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
})


module.exports = router;
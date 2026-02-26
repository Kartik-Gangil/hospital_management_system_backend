// routes/saleBill.js

const express = require("express");
const router = express.Router();
const prisma = require("../controller/DB");

/**
 * GET /api/sale-bills/search
 *
 * Query Params:
 * ?date=2026-02-26
 * OR
 * ?from=2026-02-01&to=2026-02-26
 *
 * Optional:
 * ?page=1
 * ?limit=10
 */

router.get("/search", async (req, res) => {
    try {
        const { date, from, to, page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let filter = {};

        // ✅ Single date search
        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);

            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            filter.createdAt = {
                gte: start,
                lte: end,
            };
        }

        // ✅ Date range search
        if (from && to) {
            filter.createdAt = {
                gte: new Date(from),
                lte: new Date(to),
            };
        }

        // 🔹 Get paginated sale bills
        const saleBills = await prisma.saleBill.findMany({
            where: filter,
            include: {
                items: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: skip,
            take: limitNumber,
        });

        // 🔹 Get total count
        const totalCount = await prisma.saleBill.count({
            where: filter,
        });

        // 🔹 Get total sales amount
        const totalSales = await prisma.saleBill.aggregate({
            where: filter,
            _sum: {
                TotalAmount: true,
            },
        });

        res.status(200).json({
            success: true,
            pagination: {
                totalRecords: totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
                pageSize: limitNumber,
            },
            totalSalesAmount: totalSales._sum.TotalAmount || 0,
            data: saleBills,
        });

    } catch (error) {
        console.error("Sale Bill Search Error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching sale bills",
        });
    }
});

module.exports = router;
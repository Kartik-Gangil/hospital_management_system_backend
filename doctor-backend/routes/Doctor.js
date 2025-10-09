const express = require('express');
const prisma = require('../controller/DB');
const router = express.Router()



router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.doctor.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.get("/get/allDoctors", async (req, res) => {
    try {
        const data = await prisma.doctor.findMany();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await prisma.doctor.findUnique({
            where: {
                email
            }
        })
        if (data.Password == password) {
            return res.status(200).json({ id: data.id })
        }
        return res.status(500).json("Not found")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


module.exports = router
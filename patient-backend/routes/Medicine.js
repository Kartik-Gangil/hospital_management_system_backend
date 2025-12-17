const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.post("/:Aid", async (req, res) => {
    try {
        const {Aid } = req.params;
        const { medicine, Dose,
            Days,
            Intake,
            message, } = req.body;
        const Medicine = await prisma.medicine.create({
            data: {
                appointment: { connect: { id: Aid } },
                Dose,
                Days,
                Intake,
                message,
                medicine
            }
        })
        return res.status(200).json({ message: "Medicine added successfully", Medicine })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


module.exports = router;
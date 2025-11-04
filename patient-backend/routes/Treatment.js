const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')


router.post('/:Pid/:Aid', async (req, res) => {
    try {
        const { Pid, Aid } = req.params;
        const { type, message } = req.body;
        if (!Pid || !Aid || !type || !message) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const Treatment = await prisma.treatment.create({
            data: {
                type,
                message,
                appointmentId: Aid,
                patientId: parseInt(Pid)
            }
        })
        return res.status(200).json({ message: "treatment added successfully", Treatment })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

module.exports = router;
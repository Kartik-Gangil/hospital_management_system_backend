const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.post("/:Aid", async (req, res) => {

    try {
        const { Aid } = req.params;
        const { R_eye,
            L_eye,
            Systemic,
            Others } = req.body;

        if (!Aid) {
            return res.status(400).json({ error: "Appointment ID are required" })
        }
        const diagnosis = await prisma.diagnosis.create({
            data: {
                R_eye,
                L_eye,
                Systemic,
                Others,
                appointmentId: Aid
            }
        })
        return res.status(200).json(diagnosis)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router;
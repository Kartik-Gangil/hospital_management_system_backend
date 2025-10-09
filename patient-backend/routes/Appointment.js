const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB');




router.post('/createAppointment', async (req, res) => {
    try {
        const { P_id, D_id, message, date } = req.body;
        const result = await prisma.appointment.create({
            data: {
                P_id: parseInt(P_id),
                D_id,
                Appointment_date: date,
                // complaint: message
            }
        })
        // const response = convertBigInt(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong", error });
    }
})


router.get('/allAppointment', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const data = await prisma.appointment.findMany({
            // where: {
            //     Appointment_date: new Date(today)
            // },
            include: {
                patient: true
            }
        });
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB');



// function convertBigInt(obj) {
//     return JSON.parse(
//         JSON.stringify(obj, (_, value) =>
//             typeof value === "bigint" ? value.toString() : value
//         )
//     );
// }


router.post('/createAppointment', async (req, res) => {
    try {
        const { P_id, D_id, Appointment_date, message } = req.body;
        const  result  = await prisma.appointment.create({
            data: {
                P_id,
                D_id,
                Appointment_date: new Date(),
                complaint: message
            }
        })
        // const response = convertBigInt(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong", error });
    }
})


module.exports = router
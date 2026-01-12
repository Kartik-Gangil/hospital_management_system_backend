const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.post("/:Aid", async (req, res) => {
    try {
        const { Aid } = req.params;
        const { filteredItems } = req.body; // this is an array of objects which contain JSON data with respect to the medicine model in prisma in this we have these fields
        // console.log(filteredItems)
        /*
        [{
            medicine, 
            Dose,
            Days,
            Intake,
            message,
            }]
        */

        if (!Array.isArray(filteredItems) || filteredItems.length === 0) {
            return res.status(400).json({ message: "Medicine must be a non-empty array" });
        }
        /* we use transaction for data consistency and atomicity in the DB */
        const medicines = await prisma.$transaction(
            filteredItems.map(item =>
                prisma.medicine.create({
                    data: {
                        appointment: { connect: { id: Aid } },
                        Dose: item.dose,
                        Duration: item.duration,
                        Days: '0', // soon remove this field from DB and api
                        eye: item.eye,
                        type: item.type,
                        Intake: '0', // soon remove this field from DB and api
                        message: item.comment,
                        medicine: item.DrugName
                    }
                })
            )
        );

        return res.status(200).json({ message: "Medicine added successfully", medicines, success: true})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


module.exports = router;
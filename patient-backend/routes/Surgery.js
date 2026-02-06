const express = require ('express')
const router = express.Router();
const prisma = require('../controller/DB')


router.post("/:Aid", async (req, res) => {
    try {
        const { Aid } = req.params;
        const { filteredItems } = req.body; // this is an array of objects which contain JSON data with respect to the surgery model in prisma in this we have these fields
        // console.log(filteredItems)
        /*
        [{
            SurgeryName, 
            eye,
            message,
            }]
        */

        if (!Array.isArray(filteredItems) || filteredItems.length === 0) {
            return res.status(400).json({ message: "Surgery must be a non-empty array" });
        }
        /* we use transaction for data consistency and atomicity in the DB */
        const Surgery = await prisma.$transaction(
            filteredItems.map(item =>
                prisma.surgery.create({
                    data: {
                        appointment: { connect: { id: Aid } },
                        SurgeryName: item.SurgeryName,
                        eye: item.eye,
                        message: item.message,
                    }
                })
            )
        );

        return res.status(200).json({ message: "Surgery added successfully", Surgery, success: true })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

module.exports = router;
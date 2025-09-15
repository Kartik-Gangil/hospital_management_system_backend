const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')


// function convertBigInt(obj) {
//     return JSON.parse(
//         JSON.stringify(obj, (_, value) =>
//             typeof value === "bigint" ? value.toString() : value
//         )
//     );
// }

// create complaint

router.post('/createComplaint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { message, D_id } = req.body;
        const result = await prisma.complaint.create({
            data: {
                P_id: id,
                D_id,
                message
            }
        })
        // const response = convertBigInt(result);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


router.get('/viewComplaint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.complaint.findMany({
            where: { P_id: id }
        })
        // const response = convertBigInt(data);
        return res.status(200).json(data)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})









module.exports = router
const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')
const storage = require('../multerConfig');
const multer = require('multer');
const upload = multer({ storage })

// ✅ Helper function to convert all BigInt -> String
// const convertBigIntToString = (obj) => {
//     if (Array.isArray(obj)) {
//         return obj.map(convertBigIntToString);
//     } else if (obj !== null && typeof obj === 'object') {
//         return Object.fromEntries(
//             Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
//         );
//     } else if (typeof obj === 'bigint') {
//         return obj.toString();
//     }
//     return obj;
// };

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.patient.findUnique({
            where: {
                id
            },
            include: {
                Complaint: true,   // saare complaints fetch hoga
                Appointment: true, // saare appointments fetch hoga
                Histroy: true      // saara history fetch hoga
            }
        })
        if (!data) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // ✅ Convert BigInt fields automatically
        // const response = convertBigIntToString(data);

        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});


router.post('/NewPatient', upload.array("files", 10), async (req, res) => {
    try {
        const { FullName, Gender, Phone, DOB, Reffered_by, Age, Insurance, Address, City, State, Blood_group, Emgr_name, Emgr_mobile_no } = req.body;

        const filePath = req.files.map((file) => file.path)

        const result = await prisma.patient.create({
            data: {
                FullName, Gender, Phone, DOB, Reffered_by, Age, Insurance, Address, City, State, Blood_group, Emgr_name, Emgr_mobile_no, document: filePath
            }
        })
        if (!result) {
            return res.status(400).json("something went wrong");
        }
        res.status(200).json({ message: "patient registered" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});






module.exports = router;

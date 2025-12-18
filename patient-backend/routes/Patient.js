const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')
const storage = require('../multerConfig');
const multer = require('multer');
const upload = multer({ storage })



router.get('/allPatient', async (req, res) => {
    try {
        const data = await prisma.patient.findMany();
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
})

router.get('/:id/:Aid', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const Aid = req.params.Aid;

        const data = await prisma.patient.findUnique({
            where: { id },
            include: {
                Appointment: {
                    // where: { id: Aid },
                    orderBy: {
                        created_at: 'desc',
                    },
                    include: {
                        Complaint: {
                            orderBy: { created_at: 'desc' },
                        },
                        History: {
                            orderBy: { created_at: 'desc' },
                        },
                        Refraction: {
                            orderBy: { created_at: 'desc' },
                        },
                        Vision: {
                            orderBy: { created_at: 'desc' },
                        },
                        Anterior: {
                            orderBy: { created_at: 'desc' },
                        },
                        Posterior: {
                            orderBy: { created_at: 'desc' },
                        },
                        Diagnosis: {
                            orderBy: { created_at: 'desc' },
                        },
                        Advise: {
                            orderBy: { created_at: 'desc' },
                        },
                        Treatment: {
                            orderBy: { created_at: 'desc' },
                        },
                        Medicine: {
                            orderBy: { created_at: 'desc' },
                        },
                    },
                },
                allergies: true,
                Report: true,
            },
        });

        if (!data) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Something went wrong',
            error: error.message,
        });
    }
});


router.post('/NewPatient', upload.array("files", 10), async (req, res) => {
    try {
        const { FullName, Gender, Phone, DOB, Reffered_by, Insurance, Address, City, State, Blood_group, Emgr_mobile_no, Branch } = req.body;

        const filePath = req?.files?.map((file) => file.path)
        const age = Math.floor((new Date().getFullYear() - new Date(DOB).getFullYear())).toString();
        const result = await prisma.patient.create({
            data: {
                FullName, Gender, Phone, DOB, Reffered_by,
                Age: age,
                Branch,
                Insurance, Address, City, State, Blood_group, Emgr_mobile_no, document: filePath
            }
        })
        if (!result) {
            return res.status(400).json("something went wrong");
        }
        res.status(200).json({ message: "patient registered" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong", error });
    }
});




module.exports = router;

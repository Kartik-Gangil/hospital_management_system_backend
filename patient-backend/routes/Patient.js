const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')
const storage = require('../multerConfig');
const multer = require('multer');
const upload = multer({ storage })



router.get('/allPatient', async (req, res) => {
    try {
        const data = await prisma.patient.findMany({
            select: {
                id: true,
                FullName:true
            }
        });
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
})



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.patient.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                Complaint: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },   // saare complaints fetch hoga
                Appointment: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                History: {
                    orderBy: {
                        created_at: 'desc',
                    },
                }, // saara history fetch hoga
                Refraction: {
                    orderBy: {
                        created_at: 'desc',
                    },

                },
                Vision: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                Anterior: {
                    orderBy: {
                        created_at: 'desc',
                    },

                },
                Posterior: {
                    orderBy: {
                        created_at: 'desc',
                    },

                },
                Diagnosis: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                Advise: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                Treatment: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                Medicine: {
                    orderBy: {
                        created_at: 'desc',
                    },
                },
                Allergies: true,
                Report: true
            }
        })
        if (!data) {
            return res.status(404).json({ message: "Patient not found" });
        }


        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong" , error });
    }
});


router.post('/NewPatient', upload.array("files", 10), async (req, res) => {
    try {
        const { FullName, Gender, Phone, DOB, Reffered_by, Age, Insurance, Address, City, State, Blood_group, Emgr_mobile_no } = req.body;

        const filePath = req?.files?.map((file) => file.path)

        const result = await prisma.patient.create({
            data: {
                FullName, Gender, Phone, DOB, Reffered_by, Age, Insurance, Address, City, State, Blood_group, Emgr_mobile_no, document: filePath
            }
        })
        if (!result) {
            return res.status(400).json("something went wrong");
        }
        res.status(200).json({ message: "patient registered" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong" , error});
    }
});




module.exports = router;

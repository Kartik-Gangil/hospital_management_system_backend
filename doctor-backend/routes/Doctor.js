const express = require('express');
const prisma = require('../controller/DB');
const router = express.Router()
const multer = require('multer');
const storage = require('../multerConfig');
const upload = multer({ storage })
const verifyToken = require('../middleware/verifyToken')

// get doctor details
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.doctor.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
// update the specific doctor
router.put("/:id", upload.array('files', 5), async (req, res) => {
    try {
        const { email, Password, FullName, Department, Designation, Gender, Phone, Address, State, City, Document } = req.body;
        const { id } = req.params;
        const data = await prisma.doctor.update({
            where: {
                id
            },
            data: {
                email, Password, FullName, Department, Designation, Gender, Phone, Address, State, City, Document
            }
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// delete the specific doctor
router.delete("/:id", verifyToken ,async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.doctor.delete({
            where: {
                id
            }
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// get all doctors
router.get("/get/allDoctors", async (req, res) => {
    try {
        const data = await prisma.doctor.findMany();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


// login route for doctor
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await prisma.doctor.findUnique({
            where: {
                email
            }
        })
        if (data.Password == password) {
            return res.status(200).json({ id: data.id })
        }
        return res.status(500).json("Not found")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


router.post("/addDoctor", upload.array("files", 5), async (req, res) => {
    try {
        const { email, Password, FullName, Department, Designation, Gender, Phone, Address, State, City, Document } = req.body;

        if (!email && !Password && !FullName && !Department && !Designation && !Gender && !Phone && !Address) {
            return res.status(400).json({ message: "something went wronge" })
        }

        const Email = await prisma.doctor.findUnique({
            where: {
                email
            }
        })
        if (Email) {
            return res.status(400).json({ message: "use valid email , user already exist or email is incorrect" })
        }

        const data = await prisma.doctor.create({
            data: {
                email, Password, FullName, Department, Designation, Gender, Phone, Address, State, City, Document
            }
        })

        return res.status(200).json({ message: "doctor add successfully", data });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})








module.exports = router
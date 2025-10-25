const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB');
const multer = require('multer');
const storage = require('../multerConfig');
const upload = multer({ storage });

router.post('/:Pid', upload.array('file', 5), async (req, res) => {
    try {
        const { Pid } = req.params;
        const { name } = req.body;

        // Check for uploaded files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Create an array of { name, path } objects for uploaded files
        const newFiles = req.files.map(file => ({
            name: name || file.originalname,
            path: file.path,
        }));

        // Check if a report already exists for this patient
        const exist = await prisma.report.findFirst({
            where: { patientId: parseInt(Pid) }
        });

        let data;
        if (!exist) {
            // Create new record if none exists
            data = await prisma.report.create({
                data: {
                    patientId: parseInt(Pid),
                    document: newFiles,
                },
            });
        } else {
            // Merge new files with existing ones
            const oldFiles = Array.isArray(exist.document) ? exist.document : [];
            const updatedFiles = [...oldFiles, ...newFiles];

            data = await prisma.report.update({
                where: { id: exist.id },
                data: { document: updatedFiles },
            });
        }

        return res.status(200).json(data);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "something went wrong", error: e.message });
    }
});

module.exports = router;

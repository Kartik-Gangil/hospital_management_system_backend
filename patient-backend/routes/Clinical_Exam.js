const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.post('/anterior/:Pid/:Aid', async (req, res) => {
    try {
        const { Pid, Aid } = req.params;
        const { R_Intraocular_pressure_NCT,
            R_Intraocular_pressure_Tonopen,
            R_Intraocular_pressure_AT,
            R_Eyelids,
            R_Eyelashes,
            R_Lacrimal_punctum,
            R_Orbit,
            R_Extraocular_movements,
            R_Eye_position,
            R_Sclera_episclera,
            R_Conjunctiva,
            R_Cornea,
            R_Anterior_chamber,
            R_Angles,
            R_Iris_pupil,
            R_Lens,
            R_Lacrimal_syringing,
            R_Gonioscopy,
            R_Others,
            L_Intraocular_pressure_NCT,
            L_Intraocular_pressure_Tonopen,
            L_Intraocular_pressure_AT,
            L_Eyelids,
            L_Eyelashes,
            L_Lacrimal_punctum,
            L_Orbit,
            L_Extraocular_movements,
            L_Eye_position,
            L_Sclera_episclera,
            L_Conjunctiva,
            L_Cornea,
            L_Anterior_chamber,
            L_Angles,
            L_Iris_pupil,
            L_Lens,
            L_Lacrimal_syringing,
            L_Gonioscopy,
            L_Others,
        } = req.body

        if (!Pid || !Aid) {
            return res.status(400).json({ error: "Pid, Aid are required" });
        }
        const data = await prisma.anterior.create({
            data: {
                R_Intraocular_pressure_NCT,
                R_Intraocular_pressure_Tonopen,
                R_Intraocular_pressure_AT,
                R_Eyelids,
                R_Eyelashes,
                R_Lacrimal_punctum,
                R_Orbit,
                R_Extraocular_movements,
                R_Eye_position,
                R_Sclera_episclera,
                R_Conjunctiva,
                R_Cornea,
                R_Anterior_chamber,
                R_Angles,
                R_Iris_pupil,
                R_Lens,
                R_Lacrimal_syringing,
                R_Gonioscopy,
                R_Others,
                L_Intraocular_pressure_NCT,
                L_Intraocular_pressure_Tonopen,
                L_Intraocular_pressure_AT,
                L_Eyelids,
                L_Eyelashes,
                L_Lacrimal_punctum,
                L_Orbit,
                L_Extraocular_movements,
                L_Eye_position,
                L_Sclera_episclera,
                L_Conjunctiva,
                L_Cornea,
                L_Anterior_chamber,
                L_Angles,
                L_Iris_pupil,
                L_Lens,
                L_Lacrimal_syringing,
                L_Gonioscopy,
                L_Others,
                patientId: parseInt(Pid),
                appointmentId: Aid
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})



router.post('/posterior/:Pid/:Aid', async (req, res) => {
    try {
        const { Pid, Aid } = req.params;
        const { R_Media,
            R_Vitreous,
            R_Retina,
            R_Optic_nerve_head,
            R_Choroid,
            R_Macula,
            R_Others,
            L_Media,
            L_Vitreous,
            L_Retina,
            L_Optic_nerve_head,
            L_Choroid,
            L_Macula,
            L_Others
        } = req.body

        if (!Pid || !Aid) {
            return res.status(400).json({ error: "Pid, Aid are required" });
        }
        const data = await prisma.posterior.create({
            data: {
                R_Media,
                R_Vitreous,
                R_Retina,
                R_Optic_nerve_head,
                R_Choroid,
                R_Macula,
                R_Others,
                L_Media,
                L_Vitreous,
                L_Retina,
                L_Optic_nerve_head,
                L_Choroid,
                L_Macula,
                L_Others,
                patientId: parseInt(Pid),
                appointmentId: Aid
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})



router.post('/posteriorDrawing/:Pid', async (req, res) => {
    const drawingData = req.body;
    const { Pid } = req.params;
    if (!Pid) {
        return res.status(400).json({ error: "Pid is required" });
    }
    try {
        const data = await prisma.patient.update({
            where: {
                id: parseInt(Pid)
            },
            data: {
                Posterior_Drawing: drawingData
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
});

// API to LOAD the drawing logic for editing
router.get('/posteriorDrawing/:Pid', async (req, res) => {
    const { Pid } = req.params;
    if (!Pid) {
        return res.status(400).json({ error: "Pid are required" });
    }
    try {
        const data = await prisma.patient.findUnique({
            where: {
                id: parseInt(Pid)
            },
            select: {
                Posterior_Drawing: true
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
});





router.post('/AnteriorDrawing/:Pid', async (req, res) => {
    const drawingData = req.body;
    const { Pid } = req.params;
    if (!Pid) {
        return res.status(400).json({ error: "Pid are required" });
    }
    try {
        const data = await prisma.patient.update({
            where: {
                id: parseInt(Pid)
            },
            data: {
                Anterior_Drawing: drawingData
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
});

// API to LOAD the drawing logic for editing
router.get('/AnteriorDrawing/:Pid', async (req, res) => {
    const { Pid } = req.params;
    if (!Pid) {
        return res.status(400).json({ error: "Pid are required" });
    }
    try {
        const data = await prisma.patient.findUnique({
            where: {
               id: parseInt(Pid)
            },
            select: {
                Anterior_Drawing: true
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
});





module.exports = router;
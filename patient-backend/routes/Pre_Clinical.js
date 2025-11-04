const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')


// create complaint

router.post('/createComplaint/:id/:A_id', async (req, res) => {
    try {
        const { id, A_id } = req.params;
        const { message, D_id } = req.body;
        const result = await prisma.complaint.create({
            data: {
                P_id: parseInt(id),
                D_id,
                message,
                appointmentId: A_id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})
// view complaint

router.get('/viewComplaint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.complaint.findMany({
            where: { P_id: id }
        })
        return res.status(200).json(data)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// create histroy

router.post('/histroy/:id/:A_id', async (req, res) => {
    try {
        const { id, A_id } = req.params;

        const { D_id,
            Systemic_illness,
            Treatment_Histroy,
            Dite_Histroy,
            Family_Histroy,

        } = req.body

        if (!id || !D_id) {
            return res.status(400).json({ error: "appointmentId, P_id, and D_id are required" });
        }

        const data = await prisma.history.create({
            data: {
                P_id: parseInt(id),
                D_id,
                Systemic_illness,
                Treatment_Histroy,
                Dite_Histroy,
                Family_Histroy,
                appointmentId: A_id,
            }
        })
        return res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

//  allergies

router.post('/allergies/:id/:Aid', async (req, res) => {
    try {
        let { allergies } = req.body;
        const { id, Aid } = req.params;
        if (!id, !Aid) {
            return res.status(400).json({ error: "appointmentId, P_id are required" });

        }
        if (typeof allergies === "string") {
            allergies = allergies.split(",").map(item => item.trim()); // remove extra spaces
        } else if (!Array.isArray(allergies)) {
            return res.status(400).json({ error: "allergies must be a comma-separated string or an array" });
        }
        const query = await prisma.allergies.findFirst({
            where: {
                patientId: parseInt(id),
                appointmentId: Aid
            }
        })
        if (!query) {
            const data = await prisma.allergies.create({
                data: {
                    allergies,
                    patientId: parseInt(id),
                    appointmentId: Aid
                }
            })
            return res.status(200).json(data)
        }
        const data = await prisma.allergies.updateMany({
            where: {
                patientId: parseInt(id),
                appointmentId: Aid
            },
            data: {
                allergies,
            }
        })

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})
// vision

router.post('/vision/:id/:Aid', async (req, res) => {
    try {
        const { R_Distance_unaided,
            R_Distance_With_Pin_Hole,
            R_Distance_With_CT,
            R_Distance_With_PMT,
            R_Distance_with_previous_glasses,
            R_Distance_with_current_subjective,
            R_Near_unaided,
            R_Near_with_previous_glasses,
            R_Near_with_current_subjective,
            L_Distance_unaided,
            L_Distance_With_Pin_Hole,
            L_Distance_With_CT,
            L_Distance_With_PMT,
            L_Distance_with_previous_glasses,
            L_Distance_with_current_subjective,
            L_Near_unaided,
            L_Near_with_previous_glasses,
            L_Near_with_current_subjective,
        } = req.body;
        const { id, Aid } = req.params;

        if (!id, !Aid) {
            return res.status(400).json({ error: "appointmentId, P_id are required" });

        }

        const data = await prisma.vision.create({
            data: {
                patientId: parseInt(id),
                appointmentId: Aid,
                R_Distance_unaided,
                R_Distance_With_Pin_Hole,
                R_Distance_With_CT,
                R_Distance_With_PMT,
                R_Distance_with_previous_glasses,
                R_Distance_with_current_subjective,
                R_Near_unaided,
                R_Near_with_previous_glasses,
                R_Near_with_current_subjective,
                L_Distance_unaided,
                L_Distance_With_Pin_Hole,
                L_Distance_With_CT,
                L_Distance_With_PMT,
                L_Distance_with_previous_glasses,
                L_Distance_with_current_subjective,
                L_Near_unaided,
                L_Near_with_previous_glasses,
                L_Near_with_current_subjective,
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})
// refraction


router.post('/refraction/:id/:Aid', async (req, res) => {
    try {
        const {
            refractionType,
            R_D_SPH,
            R_D_CYL,
            R_D_AXIS,
            R_D_VA,
            R_N_SPH,
            R_N_CYL,
            R_N_AXIS,
            R_N_VA,
            L_D_SPH,
            L_D_CYL,
            L_D_AXIS,
            L_D_VA,
            L_N_SPH,
            L_N_CYL,
            L_N_AXIS,
            L_N_VA,
            Glass_Type,

        } = req.body;
        const { id, Aid } = req.params;

        if (!id, !Aid) {
            return res.status(400).json({ error: "appointmentId, P_id are required" });

        }

        const data = await prisma.refraction.create({
            data: {
                patientId: parseInt(id),
                refractionType,
                R_D_SPH,
                R_D_CYL,
                R_D_AXIS,
                R_D_VA,
                R_N_SPH,
                R_N_CYL,
                R_N_AXIS,
                R_N_VA,
                L_D_SPH,
                L_D_CYL,
                L_D_AXIS,
                L_D_VA,
                L_N_SPH,
                L_N_CYL,
                L_N_AXIS,
                L_N_VA,
                Glass_Type,
                appointmentId: Aid
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

module.exports = router
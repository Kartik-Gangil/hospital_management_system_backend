const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

router.put('/complaint/:Cid', async (req, res) => {
    try {
        const { Cid } = req.params;
        const { message } = req.body;

        if (!Cid) {
            return res.status(400).json({ success: false, message: "Complaint ID is required." });
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({ success: false, message: "Message cannot be empty." });
        }

        const complain = await prisma.complaint.update({
            where: {
                id: Cid
            },
            data: {
                message
            }
        })
        return res.status(200).json({ message: "successfully updated" })
    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Histroy/:Hid', async (req, res) => {
    try {
        const { Hid } = req.params;
        const { Systemic_illness,
            Treatment_Histroy,
            Dite_Histroy,
            Family_Histroy, } = req.body;

        if (!Hid) {
            return res.status(400).json({ success: false, message: "Histroy ID is required." });
        }

        const Histroy = await prisma.history.update({
            where: { id: Hid },
            data: {
                Systemic_illness,
                Treatment_Histroy,
                Dite_Histroy,
                Family_Histroy,
            }
        })
        return res.status(200).json({ message: "successfully updated" })
    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Diagnosis/:Did', async (req, res) => {
    try {
        const { Did } = req.params;
        const { R_eye,
            L_eye,
            Systemic,
            Others } = req.body;
        if (!Did) {
            return res.status(400).json({ success: false, message: "Diagnosis ID is required." });
        }
        const diagnosis = await prisma.diagnosis.update({
            where: {
                id: parseInt(Did)
            },
            data: {
                R_eye,
                L_eye,
                Systemic,
                Others
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Advise/:Aid', async (req, res) => {
    try {
        const { Aid } = req.params;
        const { type,
            message, } = req.body;
        if (!Aid) {
            return res.status(400).json({ success: false, message: "Advise ID is required." });
        }
        const Advise = await prisma.advise.update({
            where: {
                id: parseInt(Aid)
            },
            data: {
                type,
                message,
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Medicine/:Mid', async (req, res) => {
    try {
        const { Mid } = req.params;
        const { medicine, Dose,
            Days,
            Intake,
            message, } = req.body;
        if (!Mid) {
            return res.status(400).json({ success: false, message: "Medicine ID is required." });
        }
        const Medicine = await prisma.medicine.update({
            where: {
                id: parseInt(Mid)
            },
            data: {
                medicine,
                Dose,
                Days,
                Intake,
                message
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Vision/:Vid', async (req, res) => {
    try {
        const { Vid } = req.params;
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
            L_Near_with_current_subjective, } = req.body;
        if (!Vid) {
            return res.status(400).json({ success: false, message: "Vision ID is required." });
        }
        const Vison = await prisma.vision.update({
            where: {
                id: parseInt(Vid)
            },
            data: {
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
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Refraction/:Rid', async (req, res) => {
    try {
        const { Rid } = req.params;
        const { refractionType,
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
            Glass_Type, } = req.body;
        if (!Rid) {
            return res.status(400).json({ success: false, message: "Refraction ID is required." });
        }
        const refraction = await prisma.refraction.update({
            where: {
                id: parseInt(Rid)
            },
            data: {
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
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Treatment/:Tid', async (req, res) => {
    try {
        const { Tid } = req.params;
        const { type, message } = req.body;
        if (!Tid) {
            return res.status(400).json({ success: false, message: "Treatment ID is required." });
        }
        const treatment = await prisma.treatment.update({
            where: {
                id: parseInt(Tid)
            },
            data: {
                type, message
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Anterior/:Aid', async (req, res) => {
    try {
        const { Aid } = req.params;
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
            L_Others, } = req.body;
        if (!Aid) {
            return res.status(400).json({ success: false, message: "Anterior ID is required." });
        }
        const anterior = await prisma.anterior.update({
            where: {
                id: parseInt(Aid)
            },
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
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/Posterior/:Pid', async (req, res) => {
    try {
        const { Pid } = req.params;
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
            L_Others } = req.body;
        if (!Pid) {
            return res.status(400).json({ success: false, message: "Posterior ID is required." });
        }
        const posterior = await prisma.posterior.update({
            where: {
                id: parseInt(Pid)
            },
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
                L_Others
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/surgery/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const { SurgeryName, message, eye } = req.body;
        if (!sid) {
            return res.status(400).json({ success: false, message: "Surgery ID is required." });
        }
        const surgery = await prisma.surgery.update({
            where: {
                id: parseInt(sid)
            },
            data: {
                SurgeryName,
                message,
                eye
            }
        })
        return res.status(200).json({ message: "successfully updated" })

    } catch (error) {
        return res.status(500).json({ error })
    }
})


module.exports = router
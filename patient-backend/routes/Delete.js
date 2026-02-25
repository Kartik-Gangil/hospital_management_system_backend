const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB')

// delete complaint

router.delete('/deleteComplaint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.complaint.delete({
            where: { id: id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


// delete histroy

router.delete('/deletehistroy/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.history.delete({
            where: { id: id }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


// delete refraction

router.delete('/deleterefraction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.refraction.delete({
            where: { id: parseInt(id) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete Diagnosis

router.delete('/deleteDiagnosis/:Did', async (req, res) => {
    try {
        const { Did } = req.params;
        const data = await prisma.diagnosis.delete({
            where: { id: parseInt(Did) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete Advise

router.delete('/deleteAdvise/:Aid', async (req, res) => {
    try {
        const { Aid } = req.params;
        const data = await prisma.advise.delete({
            where: { id: parseInt(Aid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})
// delete Medicine

router.delete('/deleteMedicine/:Mid', async (req, res) => {
    try {
        const { Mid } = req.params;
        const data = await prisma.medicine.delete({
            where: { id: parseInt(Mid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete vision

router.delete('/deleteVision/:Vid', async (req, res) => {
    try {
        const { Vid } = req.params;
        const data = await prisma.vision.delete({
            where: { id: parseInt(Vid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete treatment


router.delete('/deleteTreatment/:Tid', async (req, res) => {
    try {
        const { Tid } = req.params;
        const data = await prisma.treatment.delete({
            where: { id: parseInt(Tid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete Anterior

router.delete('/deleteAnterior/:Aid', async (req, res) => {
    try {
        const { Aid } = req.params;
        const data = await prisma.anterior.delete({
            where: { id: parseInt(Aid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete posterior

router.delete('/deletePosterior/:Pid', async (req, res) => {
    try {
        const { Pid } = req.params;
        const data = await prisma.posterior.delete({
            where: { id: parseInt(Pid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})

// delete surgery

router.delete('/deleteSurgery/:Sid', async (req, res) => {
    try {
        const { Sid } = req.params;
        const data = await prisma.surgery.delete({
            where: { id: parseInt(Sid) }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong", error })
    }
})


module.exports = router;
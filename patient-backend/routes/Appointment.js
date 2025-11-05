const express = require('express');
const router = express.Router();
const prisma = require('../controller/DB');
const { redisClient } = require('../redisClient');

// Helper function to update Redis counts
async function updateRedisCounts(status, prevStatus = null) {
    let counts = await redisClient.get('appointment_counts');
    counts = counts ? JSON.parse(counts) : {};

    // Increment the new status count
    counts[status] = (counts[status] || 0) + 1;

    // Decrement previous status if applicable
    if (prevStatus && counts[prevStatus] > 0) {
        counts[prevStatus]--;
    }
    await Promise.all([
        redisClient.set('appointment_counts', JSON.stringify(counts)),
        redisClient.publish('appointment_updates', JSON.stringify({ result: counts }))
    ])
}

// ----------------------------------------
// Create Appointment
// ----------------------------------------
router.post('/createAppointment', async (req, res) => {
    try {
        const { P_id, D_id, time, date } = req.body;
        const result = await prisma.appointment.create({
            data: {
                P_id: parseInt(P_id),
                D_id,
                Appointment_date: date,
                Time: time,
                status: 'pending', // assuming default
            },
        });

        // Increment count for pending
        await updateRedisCounts('pending');

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
});

// ----------------------------------------
// Update Appointment Status
// ----------------------------------------
router.put('/updateStatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Get current status (avoid extra groupBy later)
        const oldAppointment = await prisma.appointment.findUnique({
            where: { id },
            select: { status: true },
        });

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status },
        });

        // Update Redis counts incrementally
        await updateRedisCounts(status, oldAppointment.status);

        return res.status(200).json({
            message: 'Appointment status updated successfully',
            updatedAppointment: updated,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
});

// ----------------------------------------
// Get All Appointments (with caching)
// ----------------------------------------
router.get('/allAppointment', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const city = req.query.city || null;
        const state = req.query.state || null;
        const skip = (page - 1) * limit;
        const data = await prisma.appointment.findMany({
            skip,
            take: limit,
            where: {
                ...(city || state ? {
                    patient: {
                        ...(city ? { City: city } : {}),
                        ...(state ? { State: state } : {}),
                    }
                } : {}
                )
            },
            orderBy: {
                Appointment_date: 'desc', // always order by something stable
            },
            select: {
                id: true,
                Appointment_date: true,
                Time: true,
                status: true,
                P_id: true,
                patient: {
                    select: {
                        FullName: true,
                        Age: true,
                        Gender: true,
                        Phone: true,
                    }
                }
            }
        });


        const totalAppointments = await prisma.appointment.count();
        const totalPages = Math.ceil(totalAppointments / limit);



        // Only compute counts if Redis doesn’t have them yet
        let counts = await redisClient.get('appointment_counts');
        if (!counts) {
            const dbCounts = await prisma.appointment.groupBy({
                by: ['status'],
                _count: { status: true },
            });

            counts = dbCounts.reduce((acc, curr) => {
                acc[curr.status] = curr._count.status;
                return acc;
            }, {});
            await redisClient.set('appointment_counts', JSON.stringify(counts));
        } else {
            counts = JSON.parse(counts);
        }

        return res.status(200).json({
            currentPage: page,
            totalPages,
            totalAppointments,
            data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

// ----------------------------------------
// Get Latest Counts from Redis
// ----------------------------------------
router.get('/latestCounts', async (req, res) => {
    try {
        const counts = await redisClient.get('appointment_counts');
        if (!counts) return res.status(404).json({ message: "Not found" });

        return res.status(200).json({ count: JSON.parse(counts) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
router.get('/AppointmentDetail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.appointment.findUnique({
            where: {
                id
            },
            select: {
                status: true,
            }
        })

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;

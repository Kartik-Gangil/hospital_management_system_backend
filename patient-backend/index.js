const express = require('express');
const cron = require("node-cron");
const { config } = require('dotenv');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const patient = require('./routes/Patient')
const pre_clinical = require('./routes/Pre_Clinical');
const Clinical_Exam = require('./routes/Clinical_Exam');
const appointment = require('./routes/Appointment');
const Diagnosis = require('./routes/Diagnosis');
const Advise = require('./routes/Advise');
const Treatment = require('./routes/Treatment');
const Medicine = require('./routes/Medicine');
const Surgery = require('./routes/Surgery');
const Update = require('./routes/Update');
const Delete = require('./routes/Delete');
const report = require('./routes/report');
const { redisSubscriber, redisClient } = require('./redisClient');

// config({ path: path.join(__dirname, '.env') }); // Load env from current directory
config()
const app = express();
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || 'localhost';

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json())
app.use(cors({
    origin: [
        "http://66.116.204.196",
        "http://localhost:5173",
        "http://localhost:5000",
        "https://modieyehospital-fronted-1.vercel.app", // for production
    ]
}))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "http://66.116.204.196",
            "http://localhost:5173",
            "http://localhost:5000",
            "https://modieyehospital-fronted-1.vercel.app", // for production
        ],
        withCredentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
    path: "/socket.io" // default, can omit
})


// Send updates to admin dashboard
// async function sendUpdate() {
//     const counts = await redisClient.hGetAll('deskCounts');
//     io.emit('updateCounts', counts);
// }


app.use("/v1/update", Update)
app.use("/v1/delete", Delete)
app.use("/v1/appointment", appointment)
app.use("/v1/advice", Advise)
app.use("/v1/Medicine", Medicine)
app.use("/v1/Surgery", Surgery)
app.use("/v1/treatment", Treatment)
app.use("/v1/diagnosis", Diagnosis)
app.use("/v1/Clinical", Clinical_Exam)
app.use("/v1/pre-clinical", pre_clinical)
app.use("/v1/patient", patient)
app.use("/v1/report", report)
app.get('/healthz', (_, res) => res.status(200).send('ok'));

io.on('connection', socket => {
    console.log('✅ Socket connected:', socket.id);
    socket.on('disconnect', () => console.log('❌ Socket disconnected:', socket.id));
});


redisSubscriber.subscribe('appointment_updates', (message) => {
    const data = JSON.parse(message);

    // data.updated = updated appointment
    // data.counts = current patient counts per department
    // console.log(data)
    io.emit('appointmentUpdated', data);
});

// reset the appointment counts every day at midnight to avoid stale data, in case of any missed updates

async function resetCount() {
    const counts = JSON.parse(`{ "Reception": 0, "Optical": 0, "Refraction": 0, "Pharmacy": 0, "Pending": 0, "Consultation": 0, "Investigation": 0, "Counselling": 0, "Miscellaneous": 0, "Completed": 0, "Cancelled": 0 }`);
    await Promise.all([
        redisClient.set('appointment_counts', JSON.stringify(counts)),
        redisClient.publish('appointment_updates', JSON.stringify({ result: counts }))
    ])
}

cron.schedule("0 0 * * *", () => { 
    resetCount()
})


server.listen(PORT, HOST, () => console.log(`server is running on port : ${PORT}`))

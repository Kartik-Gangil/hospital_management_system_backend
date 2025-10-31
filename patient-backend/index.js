const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const patient = require('./routes/Patient')
const pre_clinical = require('./routes/Pre_Clinical');
const Clinical_Exam = require('./routes/Clinical_Exam');
const appointment = require('./routes/Appointment');
const Diagnosis = require('./routes/Diagnosis');
const Advise = require('./routes/Advise');
const Treatment = require('./routes/Treatment');
const Medicine = require('./routes/Medicine');
const Update = require('./routes/Update');
const report = require('./routes/report');
const { redisSubscriber } = require('./redisClient');

config();

const app = express();
const port = process.env.PORT || 8001;
app.use(express.json())
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            // production origin: no trailing slash
            "https://modieyehospital-fronted-1.vercel.app",
            // allow overriding via env in case the frontend URL changes
            process.env.FRONTEND_URL,
        ].filter(Boolean),
        // `credentials` is the expected CORS flag
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
    path: "/socket.io" // default, can omit
});


// Send updates to admin dashboard
// async function sendUpdate() {
//     const counts = await redisClient.hGetAll('deskCounts');
//     io.emit('updateCounts', counts);
// }


app.use("/v1/update", Update)
app.use("/v1/appointment", appointment)
app.use("/v1/advice", Advise)
app.use("/v1/Medicine", Medicine)
app.use("/v1/treatment", Treatment)
app.use("/v1/diagnosis", Diagnosis)
app.use("/v1/Clinical", Clinical_Exam)
app.use("/v1/pre-clinical", pre_clinical)
app.use("/v1/patient", patient)
app.use("/v1/report", report)

io.on('connection', async (socket) => {
    console.log('Socket connected:', socket.id);
    // If you want to emit initial data to the newly connected socket,
    // you can fetch from redis and emit here like the commented code above.
    // const counts = await redisClient.hGetAll('deskCounts');
    // socket.emit('updateCounts', counts);
});

redisSubscriber.subscribe('appointment_updates', (message) => {
    const data = JSON.parse(message);

    // data.updated = updated appointment
    // data.counts = current patient counts per department
    console.log(data)
    io.emit('appointmentUpdated', data);
});


// Bind to 0.0.0.0 explicitly to ensure the server is reachable from
// other containers or external hosts in production environments.
server.listen(port, '0.0.0.0', () => console.log(`server is running on port : ${port}`))

const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const patient = require('./routes/Patient')
const complaint = require('./routes/Complaint');
const appointment = require('./routes/Appointment');

config();

const app = express();
const port = process.env.PORT || 8001;
app.use(express.json())
app.use(cors())

app.use("/v1", appointment)
app.use("/v1", complaint)
app.use("/v1", patient)





app.listen(port, () => console.log(`server is running on port : ${port}`))

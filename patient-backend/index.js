const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const patient = require('./routes/Patient')
const pre_clinical = require('./routes/Pre_Clinical');
const Clinical_Exam = require('./routes/Clinical_Exam');
const appointment = require('./routes/Appointment');
const Diagnosis = require('./routes/Diagnosis'); 
const Advise = require('./routes/Advise'); 
const Treatment = require('./routes/Treatment'); 
const Medicine = require('./routes/Medicine'); 

config();

const app = express();
const port = process.env.PORT || 8001;
app.use(express.json())
app.use(cors())

app.use("/v1/appointment", appointment)
app.use("/v1/advice", Advise)
app.use("/v1/Medicine", Medicine)
app.use("/v1/treatment", Treatment)
app.use("/v1/diagnosis", Diagnosis)
app.use("/v1/Clinical", Clinical_Exam)
app.use("/v1/pre-clinical", pre_clinical)
app.use("/v1/patient", patient)





app.listen(port, () => console.log(`server is running on port : ${port}`))

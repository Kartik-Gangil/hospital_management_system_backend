const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const prisma = require('./controller/DB')
const Doctor = require('./routes/Doctor')
config();

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cors())

app.use('/api/v1', Doctor);


app.listen(port, () => console.log(`server is running on port : ${port}`))

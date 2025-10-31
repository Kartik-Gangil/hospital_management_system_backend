const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const path = require('path');
const Doctor = require('./routes/Doctor')
config({ path: path.join(__dirname, '.env') }); // Load env from current directory

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
app.use(express.json())
app.use(cors())

app.use('/api/v1', Doctor);


app.listen(PORT, HOST, () => console.log(`server is running on port : ${PORT}`))

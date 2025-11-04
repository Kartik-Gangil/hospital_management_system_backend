const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const path = require('path');
const Doctor = require('./routes/Doctor')
// config({ path: path.join(__dirname, '.env') }); // Load env from current directory
config()
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5000",
        "https://modieyehospital-fronted-1.vercel.app", // for production
    ]
}))

app.use('/api/v1', Doctor);
app.get('/healthz', (_, res) => res.status(200).send('ok'));

app.listen(PORT, HOST, () => console.log(`server is running on port : ${PORT}`))

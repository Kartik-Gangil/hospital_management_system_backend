const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const prisma = require('./controller/DB')
config();

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cors())


app.get("/allDoctors", async (req, res) => {
    try {
        const data = await prisma.doctor.findMany();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



app.listen(port, () => console.log(`server is running on port : ${port}`))

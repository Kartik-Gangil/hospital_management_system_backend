const express = require('express');
const cors = require('cors');
const app = express();
const medicalRoutes = require('./routes/routes');


app.use(express.json())
app.use(cors({
    origin: [
        "http://66.116.204.196",// for production
        "http://localhost:5173",
        "http://localhost:5000",
        "https://modieyehospital-fronted-1.vercel.app", 
    ]
}))

const PORT = process.env.PORT || 8003;

app.get('/', (req, res) => {
    res.send('Medical Backend is running');
});
app.get('/healthz', (_, res) => res.status(200).send('ok'));

app.use('/medical', medicalRoutes);

// Additional routes and middleware can be added here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
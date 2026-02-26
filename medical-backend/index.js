const express = require('express');
const cors = require('cors');
const app = express();
const medicalRoutes = require('./routes/routes');
const Update = require('./routes/Update')
const ListAll = require('./routes/ListAll')
const Delete = require('./routes/Delete')


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

app.use('/api', medicalRoutes);
app.use('/api/update', Update);
app.use('/api/list', ListAll);
app.use('/api/delete', Delete);

// Additional routes and middleware can be added here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const path = require("path");
const cors = require("cors");
const express = require("express");
const { config } = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

config({path: path.join(__dirname , '.env')}); // Load env from parent directory
const HOST = process.env.HOST || "localhost";  // or your desired host
const PORT = process.env.PORT || 5000;  // or your desired port

const app = express(); app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// doctor Service
app.use("/doctor", createProxyMiddleware({
    target: process.env.DOCTOR_URL,
    changeOrigin: true,
    pathRewrite: { "^/doctor": "" },
}));

// patient Service
app.use("/patient", createProxyMiddleware({
    target: process.env.PATIENT_URL,
    changeOrigin: true,
    pathRewrite: { "^/patient": "" },
}));

app.listen(PORT, HOST, () => {
    console.log("API Gateway running on port 5000");
    
});

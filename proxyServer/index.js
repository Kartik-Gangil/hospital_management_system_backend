const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const { config } = require("dotenv");

config();
const app = express();
app.use(cors())

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
    ws:true,
    pathRewrite: { "^/patient": "" },
}));

app.listen(5000, () => {
    console.log("API Gateway running on port 5000");
});

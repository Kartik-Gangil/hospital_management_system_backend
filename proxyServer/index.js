const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
app.use(cors())

// doctor Service
app.use("/doctor", createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: { "^/doctor": "" },
}));

// patient Service
app.use("/patient", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    ws:true,
    pathRewrite: { "^/patient": "" },
}));

app.listen(5000, () => {
    console.log("API Gateway running on port 5000");
});

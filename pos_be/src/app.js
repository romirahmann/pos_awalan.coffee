const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { init } = require("./services/socket.service");
const mainRoute = require("./routes/routes");
const path = require("path");

const app = express();
const server = createServer(app);
const io = init(server);

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔹 API routes
app.use("/api", mainRoute);

// 🔹 Handle Not Found (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint Not Found!",
  });
});

module.exports = { app, server };

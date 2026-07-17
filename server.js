require("dotenv").config();

const express = require("express");
const { redisClient, connectRedis } = require("./config/redis");
const presenceRoutes = require("./routes/presenceroutes");

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

// Connect to Redis
connectRedis();

// Home Route
app.get("/", (req, res) => {
    res.send("Live Presence Tracker Server is Running!");
});

// Health Check API
app.get("/health", (req, res) => {
    res.json({
        success: true,
        server: "Running",
        redis: redisClient.isReady ? "Connected" : "Disconnected",
        uptime: process.uptime().toFixed(2) + " seconds",
        timestamp: new Date().toISOString()
    });
});

// Presence Routes
app.use("/", presenceRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
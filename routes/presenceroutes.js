const express = require("express");
const router = express.Router();
const { redisClient } = require("../config/redis");

// Heartbeat API
router.post("/heartbeat", async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        await redisClient.set(`user:${userId}`, "online", {
            EX: parseInt(process.env.TTL)
        });

        console.log(`Heartbeat received from user ${userId}`);

        res.json({
            success: true,
            userId,
            status: "online",
            expiresIn: `${process.env.TTL} seconds`
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Online Users API
router.get("/online-users", async (req, res) => {
    try {
        const keys = await redisClient.keys("user:*");

        const users = keys.map(key => key.replace("user:", ""));

        res.json({
            success: true,
            onlineUsers: users,
            count: users.length
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
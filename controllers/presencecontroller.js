const { redisClient } = require("../config/redis");

exports.heartbeat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "userId is required"
        });
    }

    await redisClient.set(`user:${userId}`, "online", {
        EX: parseInt(process.env.TTL)
    });

    res.json({
        success: true,
        userId,
        status: "online",
        expiresIn: `${process.env.TTL} seconds`
    });
};

exports.getOnlineUsers = async (req, res) => {
    const keys = await redisClient.keys("user:*");

    const users = keys.map(key => key.replace("user:", ""));

    res.json({
        onlineUsers: users,
        count: users.length
    });
};
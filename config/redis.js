const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Redis Error:", err);
    }
};

module.exports = {
    redisClient,
    connectRedis
};
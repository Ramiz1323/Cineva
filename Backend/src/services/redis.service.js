const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

let redisClient;

const initRedis = async () => {
  try {
    // If you are using a managed Redis on DigitalOcean, you would put the connection URL in .env
    // e.g. REDIS_URL=redis://username:password@host:port
    const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
    
    redisClient = redis.createClient({
      url: redisUrl,
    });

    redisClient.on("error", (error) => {
      console.error("Redis Client Error", error);
    });

    redisClient.on("connect", () => {
      console.log("Redis Client Connected successfully");
    });

    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
};

const getRedisClient = () => {
  if (!redisClient) {
    console.warn("Redis client not initialized yet.");
  }
  return redisClient;
};

module.exports = { initRedis, getRedisClient };

const { getRedisClient } = require("../services/redis.service");

/**
 * Generic Express middleware to cache responses in Redis
 * @param {string} prefix - Custom prefix for the cache key (e.g., 'trending:movies')
 * @param {number} expirationInSeconds - How long to keep data in cache (default: 3600 = 1 hour)
 */
const cacheData = (prefix, expirationInSeconds = 3600) => {
  return async (req, res, next) => {
    try {
      const client = getRedisClient();
      
      // If redis is not available, just continue without caching
      if (!client || !client.isOpen) {
        return next();
      }

      // Generate a unique cache key based on route prefix and query parameters (e.g., page number)
      const queryParams = JSON.stringify(req.query);
      const cacheKey = `${prefix}:${queryParams}`;

      // Check if data exists in Redis
      const cachedData = await client.get(cacheKey);

      if (cachedData) {
        // Cache Hit! Return the data immediately
        console.log(`⚡ Cache Hit: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Cache Miss. We need to intercept the response and save it before sending.
      console.log(`⏳ Cache Miss: ${cacheKey}`);
      
      const originalJson = res.json;
      
      res.json = function (body) {
        // Save the body into Redis asynchronously
        client.setEx(cacheKey, expirationInSeconds, JSON.stringify(body))
          .catch(err => console.error(`Redis Save Error for ${cacheKey}:`, err));
        
        // Call the original res.json to send response to user
        originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error("Redis Cache Middleware Error:", error);
      // Fallback to normal execution if Redis fails
      next();
    }
  };
};

module.exports = { cacheData };

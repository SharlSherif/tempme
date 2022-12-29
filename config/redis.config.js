const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", function (error) {
  console.error(error);
});
redisClient.connect()
module.exports = redisClient;
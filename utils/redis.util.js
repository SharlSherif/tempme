const redisClient = require("../config/redis.config");
const { promisify } = require("util");
const { stringifyIfObject } = require("./helpers");

const getAsync = promisify(redisClient.get).bind(redisClient);

const SET = (key, value, TTL = null) => {
  try {
    const result = redisClient.set(key, stringifyIfObject(value));
    if (TTL) redisClient.expire(key, TTL);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const GET = async (key) => {
  const result = await redisClient.get(key).catch(console.error);
  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
};

module.exports = { SET, GET };

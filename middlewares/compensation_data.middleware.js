const { constructQueries } = require("../utils/helpers");
const { SET, GET } = require("../utils/redis.util");

const preRequestMiddleware = async (req, res, next) => {
  const cached = await GET(JSON.stringify(constructQueries(req.query)));
  if (cached) return res.status(200).send(cached);

  next();
};


module.exports = { preRequestMiddleware };
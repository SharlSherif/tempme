const { constructQueries } = require("../utils/helpers");
const { SET, GET } = require("../utils/redis.util");

const preRequestMiddleware = async (req, res, next) => {
  const cached = await GET(JSON.stringify(req.query));
  if (cached) return res.status(200).send(cached);

  next();
};

const postRequestMiddleware = async (queries,) => {
  // await SET(JSON.stringify(queries), )
};

module.exports = { preRequestMiddleware, postRequestMiddleware };

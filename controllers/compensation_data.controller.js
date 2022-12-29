const {
  fetchCompensationData, constructQueries,
} = require("../services/compensation_data.service");
const { SET } = require("../utils/redis.util");

const compensationDataController = async (req, res) => {
  try {
    const { _start = 0, _end = undefined } = req.query;
    const queries = constructQueries(req.query);
    const response = await fetchCompensationData(queries, { _start, _end });
    const TTL = 86400; // one day in seconds
    SET(JSON.stringify(queries), response, TTL);
    res.status(200).send(response); // {data,count}
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

module.exports = compensationDataController;

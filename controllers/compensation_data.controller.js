const {
  fetchCompensationData,
} = require("../services/compensation_data.service");
const { SET } = require("../utils/redis.util");

const compensationDataController = async (req, res) => {
  try {
    const response = await fetchCompensationData(req.query);
    SET(JSON.stringify(req.query), response);
    res.status(200).send(response); // {data,count}
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

module.exports = compensationDataController;

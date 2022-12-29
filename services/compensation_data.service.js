const model = require("../models/compensation_data.model");
const { constructQueries } = require("../utils/helpers");

const fetchCompensationData = async (query) => {
  const { _start = 0, _end = undefined } = query;
  const queries = constructQueries(query);
  console.log(queries);
  try {
    const count = await model.countDocuments(queries.lookup);
    const data = await model
      .find(queries.lookup)
      .sort(queries.sort)
      .skip(_start)
      .limit(_end - _start)
      .exec();

    return { data, count };
  } catch (err) {
    throw new Error(err.toString());
  }
};

module.exports = { fetchCompensationData, constructQueries };

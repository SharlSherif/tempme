const model = require("../models/compensation_data.model");
const { constructQueries } = require("../utils/helpers");

const fetchCompensationData = async (queries, pagination) => {
  console.log(queries);
  try {
    const count = await model.countDocuments(queries.lookup);
    const data = await model
      .find(queries.lookup)
      .sort(queries.sort)
      .skip(pagination._start)
      .limit(pagination._end - pagination._start)
      .exec();

    return { data, count };
  } catch (err) {
    throw new Error(err.toString());
  }
};

module.exports = { fetchCompensationData, constructQueries };

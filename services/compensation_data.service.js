const model = require("../models/compensation_data.model");

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

// helpers
const constructQueries = (queries) => {
  const lookup = {},
    sort = {};

  for (const key of Object.keys(queries)) {
    const val = queries[key];

    if (val.sort !== undefined) {
      sort[key] = Number(val.sort);
    }
    if (val.gte !== undefined) {
      lookup[key] = { $gte: Number(val.gte) };
    } else if (val.lt !== undefined) {
      lookup[key] = { $lt: Number(val.lt) };
    } else if (val.gt !== undefined) {
      lookup[key] = { $gt: Number(val.gt) };
    } else if (val.eq !== undefined) {
      lookup[key] = { $eq: Number(val.gt) };
    }

    if (val.regex !== undefined) {
      lookup[key] = { $regex: new RegExp(val.regex, "gi") };
    }
    console.log(val.text);
    if (val.text !== undefined) {
      lookup["$text"] = { $search: val.text };
    }

    if (val.exact !== undefined) {
      lookup[key] = { $eq: val.exact };
    }
  }

  return { lookup, sort };
};

module.exports = { fetchCompensationData };

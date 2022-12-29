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
    if (val.text !== undefined) {
      lookup["$text"] = { $search: val.text };
    }

    if (val.exact !== undefined) {
      lookup[key] = { $eq: val.exact };
    }
  }

  return { lookup, sort };
};

const isObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const stringifyIfObject = (value) => {
  if (isObject(value)) return JSON.stringify(value);
  return value;
};
const parseArray = (object) => {
  if (!object) return [];
  return Object.values(object).map((value) => JSON.parse(value));
};

module.exports = { stringifyIfObject, parseArray, constructQueries };

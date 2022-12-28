const mongoose = require("mongoose");

const compensation_data = mongoose.Schema(
  {
    recordedTimeStamp: {
      type: Number,
    },
    age: {
      type: String,
    },
    industry: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    salary: {
      type: Number,
    },
    currency: {
      type: String,
    },
    location: {
      type: String,
    },
    experience: {
      type: String,
    },
    additionalContext: {
      type: String,
      default: "",
    },
  },
  { strict: true, timestamps: true }
);

module.exports = mongoose.model("data", compensation_data);

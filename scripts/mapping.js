const records = require("./data.json");
const model = require("../models/compensation_data.model");

const data = records.map((record) => {
  const primaryCurrency = record["Please indicate the currency"];
  const otherCurrency =
    record['If "Other," please indicate the currency here:'];
  const currency = !!otherCurrency.length ? otherCurrency : primaryCurrency;
  // remove special characters and convert it to a number type
  const salary = Number(
    record["What is your annual salary?"].replace(/[^0-9]/g, "")
  );
  return {
    recordedTimeStamp: new Date(record.Timestamp).getTime(),
    age: record["How old are you?"],
    industry: record["What industry do you work in?"],
    jobTitle: record["Job title"],
    salary,
    currency,
    location: record["Where are you located? (City/state/country)"],
    experience:
      record[
        "How many years of post-college professional work experience do you have?"
      ],
    additionalContext:
      record[
        "If your job title needs additional context, please clarify here:"
      ],
  };
});

model
  .insertMany(data)
  .then(() => {
    console.log("Data inserted");
  })
  .catch((err) => {
    console.log(err);
  });

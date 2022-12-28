const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
// mongoDB conection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => {
    console.log("connected to db", process.env.MONGO_URL);
  })
  .catch(() => {
    console.log("failed to connect to database");
  });

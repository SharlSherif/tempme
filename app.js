const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compensationDataController = require("./controllers/compensation_data.controller");
require("dotenv").config();
require("./config/mongodb.connection");

//? Seed
// require("./scripts/mapping")

app.use(bodyParser.json());
app.use(require("cors")());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.get("origin") || "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/compensation_data", compensationDataController);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server listening at port %d", process.env.SERVER_PORT);
});

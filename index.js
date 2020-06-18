const express = require("express");
const mongoose = require("mongoose");
const excel = require("./routes/excel");
const bodyParser = require("body-parser");
require('dotenv').config();

//settings
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "exceldb";


// Connect to MongoDB database
mongoose
  .connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    //middlewares
    app.use(bodyParser.json());
    //routes
    app.use("/api", excel);

    app.listen(PORT, () => {
      console.log("Server has started!");
    });
  });
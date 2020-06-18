const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  am: String,
  ap: String,
  curp: String
});

module.exports = mongoose.model("excelType1", schema);
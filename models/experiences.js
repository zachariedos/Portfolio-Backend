const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  fromto: { type: String, required: true },
  indexing: { type: Number, required: false },
});

module.exports = mongoose.model("Experience", experienceSchema);

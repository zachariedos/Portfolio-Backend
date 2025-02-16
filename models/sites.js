const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  siteName: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  indexing: { type: Number, required: false },
});

module.exports = mongoose.model("Site", siteSchema);

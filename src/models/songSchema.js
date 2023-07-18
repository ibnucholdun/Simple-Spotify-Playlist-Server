const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artists: [String],
  url: String,
  playCount: Number,
});

module.exports = mongoose.model("Song", songSchema);

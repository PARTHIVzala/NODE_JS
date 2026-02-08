const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  genre: String,
  image: String   // filename
});

module.exports = mongoose.model("Book", bookSchema);

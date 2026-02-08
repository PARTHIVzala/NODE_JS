const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: String,
  author: String,
  genre: String,
  price: Number,
  book_image: String
});

module.exports = mongoose.model("Book", bookSchema);

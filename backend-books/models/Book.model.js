const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  volumeInfo: {
    type: Object,
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
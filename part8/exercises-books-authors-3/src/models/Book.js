const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
    required: true,
    min: 301
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  genres: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Book", schema);

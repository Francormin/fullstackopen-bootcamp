const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    min: 201
  },
  bookCount: {
    type: Number,
    min: 0,
    default: 0
  }
});

module.exports = mongoose.model("Author", schema);

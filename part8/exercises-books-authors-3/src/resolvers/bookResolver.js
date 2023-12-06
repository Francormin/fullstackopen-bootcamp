const Author = require("../models/Author");

const bookResolver = {
  author: async parent => Author.findById(parent.author)
};

module.exports = bookResolver;

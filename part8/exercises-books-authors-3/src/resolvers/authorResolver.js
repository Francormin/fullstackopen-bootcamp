const Book = require("../models/Book");

const authorResolver = {
  name: parent => parent.name,
  id: parent => parent.id,
  born: parent => parent.born,
  bookCount: async parent => {
    return (await Book.find({ author: parent.id })).length;
  }
};

module.exports = authorResolver;

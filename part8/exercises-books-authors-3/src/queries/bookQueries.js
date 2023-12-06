const Author = require("../models/Author");
const Book = require("../models/Book");

const bookCount = async () => Book.collection.countDocuments();

const allBooks = async (_, args) => {
  const { genre, author } = args;
  let query = {};

  if (author) {
    const matchedAuthors = await Author.find({
      name: { $regex: new RegExp(author, "i") }
    });

    if (matchedAuthors.length > 0) {
      query.author = { $in: matchedAuthors.map(author => author.id) };
    } else {
      // No matching authors, return empty array
      return [];
    }
  }

  if (genre) {
    const regex = new RegExp(genre, "i");
    query.genres = regex;
  }

  return Book.find(query);
};

module.exports = { bookCount, allBooks };

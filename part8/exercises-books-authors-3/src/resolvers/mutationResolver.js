const {
  validateBookTitle,
  validateAuthorName,
  validateBookPublished,
  validateAuthorBorn
} = require("../utils/validation");
const Author = require("../models/Author");
const Book = require("../models/Book");

const mutationResolver = {
  addBook: async (_, args) => {
    const { title, published, author, genres } = args;

    validateBookTitle(title);
    validateBookPublished(published);
    validateAuthorName(author);

    let existingAuthor = await Author.findOne({ name: author });

    if (!existingAuthor) {
      existingAuthor = new Author({
        name: author,
        born: null,
        bookCount: 1
      });

      await existingAuthor.save();
    } else {
      existingAuthor.bookCount += 1;
      await existingAuthor.save();
    }

    try {
      const newBook = new Book({
        title,
        published,
        author: existingAuthor.id,
        genres
      });

      return newBook.save();
    } catch (error) {
      console.error(error);
    }
  },

  editAuthor: async (_, args) => {
    const { name, setBornTo } = args;

    validateAuthorBorn(setBornTo);

    const author = await Author.findOne({ name });

    if (author) {
      author.born = setBornTo;
      return author.save();
    } else {
      return null;
    }
  }
};

module.exports = mutationResolver;

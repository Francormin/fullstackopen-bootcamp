const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("../models/Author");
const Book = require("../models/Book");
const User = require("../models/User");

const {
  validateAuth,
  validateBookCreation,
  validateAuthorEdition,
  validateUserCreation,
  validateLoginCredentials
} = require("../utils/validation");
const errorCatching = require("../utils/errorCatching");

const pubsub = new PubSub();

const mutationResolver = {
  addBook: async (_, args, { currentUser }) => {
    const { title, published, author, genres } = args;

    validateAuth(currentUser);

    try {
      const existingBook = await Book.findOne({ title });

      validateBookCreation(existingBook, title, published, author);

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

      const newBook = new Book({
        title,
        published,
        author: existingAuthor.id,
        genres
      });

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook.save();
    } catch (error) {
      errorCatching(error, "Creating the book failed");
    }
  },

  editAuthor: async (_, args, { currentUser }) => {
    const { name, setBornTo } = args;

    validateAuth(currentUser);

    try {
      const author = await Author.findOne({ name });

      validateAuthorEdition(author, name, setBornTo);

      author.born = setBornTo;

      return author.save();
    } catch (error) {
      errorCatching(error, "Editing the author failed");
    }
  },

  createUser: async (_, args) => {
    const { username, favoriteGenre } = args;

    try {
      const existingUser = await User.findOne({ username });

      validateUserCreation(existingUser, username);

      const newUser = new User({
        username,
        favoriteGenre
      });

      return newUser.save();
    } catch (error) {
      errorCatching(error, "Creating the user failed");
    }
  },

  login: async (_, args) => {
    const { username, password } = args;

    try {
      const user = await User.findOne({ username });

      validateLoginCredentials(user, password);

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    } catch (error) {
      errorCatching(error, "Login failed");
    }
  }
};

module.exports = mutationResolver;

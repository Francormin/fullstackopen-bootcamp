const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();

const Author = require("./models/Author");
const Book = require("./models/Book");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `#graphql
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => async () => Book.collection.countDocuments(),
    authorCount: () => async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const { genre, author } = args;

      if (genre && author) {
        const matchedAuthor = await Author.findOne({ name: author });

        if (matchedAuthor) {
          return Book.find({
            author: matchedAuthor.name,
            genres: {
              $in: genre
            }
          });
        } else {
          return [];
        }
      }

      if (genre) {
        return Book.find({
          genres: {
            $in: genre
          }
        });
      }

      if (author) {
        const matchedAuthor = await Author.findOne({ name: author });

        if (matchedAuthor) {
          return Book.find({ author: matchedAuthor.name });
        } else {
          return [];
        }
      }

      return Book.find({});
    },
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (_, args) => {
      const { title, published, author, genres } = args;

      let existingAuthor = await Author.findOne({ name: author });

      if (!existingAuthor) {
        existingAuthor = new Author({
          name: author,
          id: uuid(),
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
        author: existingAuthor.name,
        id: uuid(),
        genres
      });

      return newBook.save();
    },
    editAuthor: async (_, args) => {
      const { name, setBornTo } = args;

      const author = await Author.findOne({ name });

      if (author) {
        author.born = setBornTo;
        return author.save();
      } else {
        return null;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

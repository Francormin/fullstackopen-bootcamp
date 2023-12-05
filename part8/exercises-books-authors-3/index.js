const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();

const Author = require("./models/Author");
const Book = require("./models/Book");

mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
  }
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"]
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"]
  }
];

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

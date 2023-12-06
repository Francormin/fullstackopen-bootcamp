const { gql } = require("apollo-server");

const { authorCount, allAuthors } = require("./queries/authorQueries");
const { bookCount, allBooks } = require("./queries/bookQueries");

const authorResolver = require("./resolvers/authorResolver");
const bookResolver = require("./resolvers/bookResolver");
const mutationResolver = require("./resolvers/mutationResolver");

const typeDefs = gql`
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
    addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
    bookCount,
    authorCount,
    allBooks,
    allAuthors
  },
  Author: authorResolver,
  Book: bookResolver,
  Mutation: mutationResolver
};

module.exports = { typeDefs, resolvers };

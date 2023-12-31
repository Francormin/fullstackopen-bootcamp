const { PubSub } = require("graphql-subscriptions");
const gql = require("graphql-tag");

const { authorCount, allAuthors } = require("./queries/authorQueries");
const { bookCount, allBooks } = require("./queries/bookQueries");
const me = require("./queries/me");

const authorResolver = require("./resolvers/authorResolver");
const bookResolver = require("./resolvers/bookResolver");
const mutationResolver = require("./resolvers/mutationResolver");

const pubsub = new PubSub();

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;

const resolvers = {
  Query: {
    bookCount,
    authorCount,
    allBooks,
    allAuthors,
    me
  },
  Author: authorResolver,
  Book: bookResolver,
  Mutation: mutationResolver,
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

module.exports = {
  typeDefs,
  resolvers,
  pubsub
};

require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createServer } = require("http");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { typeDefs, resolvers } = require("./index");
const User = require("./models/User");

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    let currentUser = null;

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      currentUser = await User.findById(decodedToken.id);
    }

    return { currentUser, pubsub };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: server.graphqlPath
    }
  );

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(error => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}

startServer();

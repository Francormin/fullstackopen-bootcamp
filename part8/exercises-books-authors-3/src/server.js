require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { PubSub } = require("graphql-subscriptions");
const { useServer } = require("graphql-ws/lib/use/ws");
const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { typeDefs, resolvers } = require("./index");
const User = require("./models/User");

// Create an instance of PubSub
const pubsub = new PubSub();

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions"
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});

const startServer = async () => {
  try {
    await server.start();

    app.use(
      "/graphql",
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          try {
            const auth = req ? req.headers.authorization : null;

            if (auth && auth.startsWith("Bearer ")) {
              const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
              const currentUser = await User.findById(decodedToken.id);
              return { currentUser, pubsub };
            }
          } catch (error) {
            console.error("Error in context function:", error);
            throw error;
          }
        }
      })
    );
  } catch (error) {
    console.error("Error starting the server:", error);
    throw error;
  }
};
startServer();

const PORT = process.env.PORT || 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error.message);
  });

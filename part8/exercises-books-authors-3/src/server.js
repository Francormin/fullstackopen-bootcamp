require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { useServer } = require("graphql-ws/lib/use/ws");
const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

const { typeDefs, resolvers, pubsub } = require("./index");
const { connectDatabase } = require("./database");
const User = require("./models/User");

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

  // Start Apollo Server first
  await server.start();

  // Apply middleware before Apollo Server middleware
  app.use(cors());
  app.use(express.json());

  // Apply Apollo Server middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        let currentUser = null;

        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
          currentUser = await User.findById(decodedToken.id);
        }

        return { currentUser, pubsub };
      }
    })
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const PORT = process.env.PORT;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
connectDatabase();

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

const { typeDefs, resolvers } = require("./index");
const { connectDatabase } = require("./database");

async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      let currentUser = null;

      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
        currentUser = await User.findById(decodedToken.id);
      }

      return { currentUser };
    },
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

  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  const PORT = process.env.PORT;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer();
connectDatabase();

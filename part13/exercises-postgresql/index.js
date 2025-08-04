const express = require("express");
const {
  blogRoutes,
  userRoutes,
  loginRoutes,
  authorRoutes,
  readingListRoutes
} = require("./src/routes");
const { unknownEndpoint, errorHandler } = require("./src/middlewares");
const { connectToDatabase } = require("./src/utils/db");
const { PORT } = require("./src/utils/config");

const app = express();

app.use(express.json());
app.use("/api/blogs/authors", authorRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/reading-lists", readingListRoutes);

// Middleware global para manejar rutas desconocidas
app.use(unknownEndpoint);

// Middleware global para manejar errores
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();

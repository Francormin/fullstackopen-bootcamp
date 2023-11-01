const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const connectionString = config.NODE_ENV === "test" ? config.MONGODB_URI_TEST : config.MONGODB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch(error => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (config.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

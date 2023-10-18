const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../utils/config");

const connectionString = config.NODE_ENV === "test" ? config.MONGODB_URI_TEST : config.MONGODB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch(error => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
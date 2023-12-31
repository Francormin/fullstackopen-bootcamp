require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;
const SECRET = process.env.SECRET;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_URI_TEST,
  SECRET,
  NODE_ENV
};

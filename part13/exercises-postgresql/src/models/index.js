const sequelize = require("../config/database");
const Blog = require("./blog");

const db = {
  sequelize,
  Blog
};

module.exports = db;

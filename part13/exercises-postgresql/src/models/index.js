const Blog = require("./blog");
const User = require("./user");

// Relación entre tablas
User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
  Blog,
  User
};

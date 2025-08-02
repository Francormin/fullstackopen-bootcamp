const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");

// Relación uno a muchos
// Un usuario puede tener muchos blogs, pero un blog pertenece a un solo usuario
User.hasMany(Blog);
Blog.belongsTo(User);

// Relación muchos a muchos
// Un usuario puede leer muchos blogs y un blog puede ser leído por muchos usuarios
User.belongsToMany(Blog, { through: ReadingList, as: "savedBlogs" });
Blog.belongsToMany(User, { through: ReadingList, as: "savedByUsers" });

module.exports = {
  Blog,
  User,
  ReadingList
};

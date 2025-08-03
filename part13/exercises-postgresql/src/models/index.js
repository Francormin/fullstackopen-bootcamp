const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");

// Relación uno a muchos
// Un usuario puede tener muchos blogs, pero un blog pertenece a un solo usuario
User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

// Relación muchos a muchos
// Un usuario puede leer muchos blogs y un blog puede ser leído por muchos usuarios
User.belongsToMany(Blog, {
  through: ReadingList,
  as: "savedBlogs",
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: "savedByUsers",
  foreignKey: "blogId",
  onDelete: "CASCADE"
});

module.exports = {
  Blog,
  User,
  ReadingList
};

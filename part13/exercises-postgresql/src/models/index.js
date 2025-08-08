const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");
const Session = require("./session");

// Relación uno a muchos entre User y Blog
// Un usuario puede tener muchos blogs, pero un blog pertenece a un solo usuario
User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

// Relación muchos a muchos entre User y Blog
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

// Relación uno a muchos entre User y Session
// Un usuario puede tener muchas sesiones, pero una sesión pertenece a un solo usuario
User.hasMany(Session, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Session.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

module.exports = {
  Blog,
  User,
  ReadingList,
  Session
};

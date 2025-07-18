require("dotenv").config();
const { sequelize, Blog } = require("./src/models");

// Ejecutar `psql -U postgres -d blogs_db -f commands.sql` y correr `node cli.js` con esta función

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    const blogs = await Blog.findAll();
    blogs.forEach(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`));

    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

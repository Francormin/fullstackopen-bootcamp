require("dotenv").config();
const { sequelize, Blog } = require("./src/models");
const initialBlogs = require("./src/seeders/initialBlogs");

// Ejecutar `psql -U postgres -d blogs_db -f commands.sql` y correr `node cli.js` con esta función

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connection has been established successfully.");

//     const blogs = await Blog.findAll();
//     blogs.forEach(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`));

//     await sequelize.close();
//   } catch (error) {
//     console.error("Unable to connect to the database: ", error);
//   }
// })();

// No se utiliza el archivo commands.sql, sino que se realiza directamente con seeders y Sequelize

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    // Sincronizar modelos (opcional, solo si no está migrada la tabla aún)
    await sequelize.sync(); // o { alter: true } en desarrollo

    // Verificar si la tabla ya tiene datos
    const count = await Blog.count();

    if (count === 0) {
      console.log("Empty table. Inserting initial data...");
      await Blog.bulkCreate(initialBlogs);
    }

    // Mostrar todos los blogs
    console.log("Blogs found:");
    const blogs = await Blog.findAll();
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    await sequelize.close();
  } catch (err) {
    console.error("❌ Unable to connect to the database: ", err);
  }
})();

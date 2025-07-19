require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/models");
const blogRoutes = require("./src/routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/blogs", blogRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    await sequelize.sync({ alter: true }); // o { force: true } para reiniciar tablas
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Unable to connect to the database: ", error);
  }
})();

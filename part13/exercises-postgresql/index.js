const express = require("express");
const blogRoutes = require("./src/routes/blogRoutes");
const { connectToDatabase } = require("./src/utils/db");
const { Blog } = require("./src/models");
const { PORT } = require("./src/utils/config");

const app = express();

app.use(express.json());
app.use("/api/blogs", blogRoutes);

// Middleware global para manejar rutas desconocidas
app.use((_req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
});

// Middleware global para manejar errores
app.use((err, _req, res, _next) => {
  if (err.name === "SequelizeValidationError") {
    const messages = err.errors.map(e => {
      if (e.message.includes("cannot be null")) {
        const field = e.path.charAt(0).toUpperCase() + e.path.slice(1);
        return `${field} is required`;
      }
      return e.message;
    });

    return res.status(400).json({ error: messages.join(", ") });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: "Invalid input. Check your data." });
  }

  if (err.name === "BadRequestError" || err.name === "NotFoundError") {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Error handler log: ", err);
  res.status(500).json({ error: "Internal server error" });
});

const start = async () => {
  await connectToDatabase();
  await Blog.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

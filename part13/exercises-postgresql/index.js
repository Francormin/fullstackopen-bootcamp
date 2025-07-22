const express = require("express");
const blogRoutes = require("./src/routes/blogRoutes");
const { connectToDatabase } = require("./src/utils/db");
const { PORT } = require("./src/utils/config");

const app = express();

app.use(express.json());
app.use("/api/blogs", blogRoutes);

// Middleware de manejo de errores (después de las rutas)
app.use((err, _req, res, _next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.message });
  }

  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

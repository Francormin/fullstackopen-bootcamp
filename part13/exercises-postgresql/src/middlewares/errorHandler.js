const errorHandler = (err, _req, res, _next) => {
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ error: messages.join(", ") });
  }

  if (err.name === "SequelizeDatabaseError") {
    console.error("Database error: ", err.message);
    if (err.message.includes("invalid input syntax")) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    return res.status(500).json({ error: "Internal database error" });
  }

  if (err.name === "BadRequestError" || err.name === "NotFoundError") {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Error handler log: ", err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;

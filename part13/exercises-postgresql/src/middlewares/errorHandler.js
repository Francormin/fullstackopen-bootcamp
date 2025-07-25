const errorHandler = (err, _req, res, _next) => {
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    const messages = err.errors.map(e => e.message);
    return messages.length > 1
      ? res.status(400).json({ errors: messages })
      : res.status(400).json({ error: messages[0] });
  }

  if (err.name === "SequelizeDatabaseError") {
    console.error("Database error: ", err.message);
    return err.message.includes("invalid input syntax")
      ? res.status(400).json({ error: "Invalid data format" })
      : res.status(500).json({ error: "Internal database error" });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (
    err.name === "BadRequestError" ||
    err.name === "NotFoundError" ||
    err.name === "UnauthorizedError"
  ) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Error handler log: ", err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;

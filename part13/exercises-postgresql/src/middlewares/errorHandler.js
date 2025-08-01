const errorHandler = (err, _req, res, _next) => {
  if (err.message && err.message.includes("WHERE parameter") && err.message.includes("undefined")) {
    return res
      .status(400)
      .json({ error: "Missing or invalid data (blogId or userId is undefined)" });
  }

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

  console.dir(err, { depth: null });
  console.error("Error handler log: ", err.message);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;

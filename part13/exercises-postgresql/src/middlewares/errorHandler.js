const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError
} = require("sequelize");

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;

  // Sequelize validation and constraint errors
  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    const messages = err.errors.map(e => e.message);
    return res
      .status(400)
      .json(messages.length > 1 ? { errors: messages } : { error: messages[0] });
  }

  // Foreign key constraint violation
  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      error: "Invalid userId or blogId. Foreign key constraint failed"
    });
  }

  // General database errors
  if (err instanceof DatabaseError) {
    console.error("Database error:", message);

    if (message.includes("invalid input syntax") && message.includes("integer")) {
      return res.status(400).json({
        error: "Invalid input syntax for integer (blogId or userId)"
      });
    }

    if (message.includes("WHERE parameter") && message.includes("undefined")) {
      return res.status(400).json({
        error: "Missing or invalid data (blogId or userId is undefined)"
      });
    }

    return res.status(500).json({ error: "Internal database error" });
  }

  // Custom domain-specific errors
  if (name === "BadRequestError" || name === "NotFoundError" || name === "UnauthorizedError") {
    return res.status(err.statusCode).json({ error: message });
  }

  // JWT errors
  if (name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Fallback error
  console.dir(err, { depth: null });
  console.error("Unhandled error:", message);
  return res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;

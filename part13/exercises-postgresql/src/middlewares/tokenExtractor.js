const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    next();
  } else {
    throw new UnauthorizedError("Missing token");
  }
};

module.exports = tokenExtractor;

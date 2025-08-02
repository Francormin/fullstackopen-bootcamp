const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UnauthorizedError } = require("./errors");
const { JWT_SECRET } = require("./config");

const extractToken = authorizationHeader => {
  if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer "))
    throw new UnauthorizedError("Missing token");

  return authorizationHeader.substring(7);
};

const verifyTokenAndGetUser = async token => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findByPk(decoded.id);
  if (!user) throw new UnauthorizedError("Invalid or expired token");

  return { decoded, user };
};

module.exports = {
  extractToken,
  verifyTokenAndGetUser
};

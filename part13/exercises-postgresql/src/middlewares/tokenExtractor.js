const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");
const { User } = require("../models");

const tokenExtractor = async (req, _res, next) => {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.toLowerCase().startsWith("bearer "))
    throw new UnauthorizedError("Missing token");

  const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
  const user = await User.findByPk(decodedToken.id);
  if (!user) throw new UnauthorizedError("Invalid or expired token");

  req.decodedToken = decodedToken;
  req.user = user;
  next();
};

module.exports = tokenExtractor;

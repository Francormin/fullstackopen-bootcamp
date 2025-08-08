const { extractToken, verifyTokenAndGetUser } = require("../utils/auth");

const sessionValidator = async (req, res, next) => {
  const token = extractToken(req.get("authorization"));
  const { decoded, user } = await verifyTokenAndGetUser(token);

  req.decodedToken = decoded;
  req.user = user;

  next();
};

module.exports = sessionValidator;

const { extractToken, verifyTokenAndGetUser } = require("../utils/auth");

const tokenExtractor = async (req, _res, next) => {
  const token = extractToken(req.get("authorization"));
  const { decoded, user } = await verifyTokenAndGetUser(token);

  req.decodedToken = decoded;
  req.user = user;

  next();
};

module.exports = tokenExtractor;

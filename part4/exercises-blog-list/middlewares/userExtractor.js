const jwt = require("jsonwebtoken");
const config = require("../utils/config");

module.exports = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }

  if (!token.length) {
    return response.status(401).send({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, config.SECRET);

  request.userId = decodedToken.id;

  next();
};

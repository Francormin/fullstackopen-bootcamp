const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { UnauthorizedError, ForbiddenError } = require("./errors");
const { JWT_SECRET } = require("./config");

const extractToken = authorizationHeader => {
  if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer "))
    throw new UnauthorizedError("Missing token");

  return authorizationHeader.substring(7);
};

const verifyTokenAndGetUser = async token => {
  // 1. Verificar la firma del JWT
  const decoded = jwt.verify(token, JWT_SECRET);

  // 2. Verificar que el token exista en la tabla Session
  const session = await Session.findOne({ where: { token } });
  if (!session) throw new UnauthorizedError("Session not found or expired");

  // 3. Buscar el usuario
  const user = await User.findByPk(decoded.id);
  if (!user) throw new UnauthorizedError("Invalid or expired token");

  // 4. Verificar que no esté deshabilitado
  if (user.disabled) throw new ForbiddenError("User account is disabled");

  return { decoded, user };
};

module.exports = {
  extractToken,
  verifyTokenAndGetUser
};

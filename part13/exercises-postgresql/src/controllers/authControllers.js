const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { UnauthorizedError, BadRequestError, ForbiddenError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { extractToken } = require("../utils/auth");

const login = async (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) throw new BadRequestError("Username and password are required");

  if (typeof username !== "string" || typeof password !== "string")
    throw new BadRequestError("Username and password must be strings");

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = password === "password";

  if (!(user && passwordCorrect)) throw new UnauthorizedError("Invalid username or password");
  if (user.disabled) throw new ForbiddenError("Account disabled. Contact admin.");

  await Session.destroy({ where: { userId: user.id } });

  const userForToken = {
    id: user.id,
    username: user.username
  };

  const token = jwt.sign(userForToken, JWT_SECRET);

  await Session.create({
    userId: user.id,
    token
  });

  res.json({
    token,
    username: user.username,
    name: user.name
  });
};

const logout = async (req, res) => {
  const token = extractToken(req.get("authorization"));
  await Session.destroy({ where: { token } });
  res.status(204).end();
};

const authControllers = {
  login,
  logout
};

module.exports = authControllers;

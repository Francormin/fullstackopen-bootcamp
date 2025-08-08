const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { UnauthorizedError, BadRequestError, ForbiddenError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const userLogin = async (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    throw new BadRequestError("Username and password are required");
  }

  if (typeof username !== "string" || typeof password !== "string") {
    throw new BadRequestError("Username and password must be strings");
  }

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = password === "password";

  if (!(user && passwordCorrect)) throw new UnauthorizedError("Invalid username or password");
  if (user.disabled) throw new ForbiddenError("Account disabled. Contact admin.");

  const userForToken = {
    username: user.username,
    id: user.id
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

const loginControllers = { userLogin };

module.exports = loginControllers;

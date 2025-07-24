const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const userLogin = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    throw new BadRequestError("Username and password are required");
  }

  if (typeof username !== "string" || typeof password !== "string") {
    throw new BadRequestError("Username and password must be strings");
  }

  const user = await User.findOne({
    where: {
      username
    }
  });

  const passwordCorrect = password === "password";

  if (!(user && passwordCorrect)) throw new UnauthorizedError("Invalid username or password");

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(userForToken, JWT_SECRET);

  res.json({
    token,
    username: user.username,
    name: user.name
  });
};

const loginControllers = { userLogin };

module.exports = loginControllers;

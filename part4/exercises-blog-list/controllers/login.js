const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../utils/config");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).send({
      error: "username and password fields are both required"
    });
  }

  try {
    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      return response.status(401).send({
        error: "invalid username or password"
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, config.SECRET, {
      expiresIn: 60 * 60 * 24 * 7
    });

    response.json({
      token,
      username: user.username,
      name: user.name
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;

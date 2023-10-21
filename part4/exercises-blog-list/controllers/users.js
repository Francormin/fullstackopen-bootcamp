const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", { title: 1, url: 1, likes: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!username || !password)
    return response.status(400).send({
      error: "username and password fields are both required"
    });

  if (password.length < 3)
    return response.status(400).send({
      error: "password must be at least 3 characters long"
    });

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
// const Blog = require("../models/Blog");
const { api, initialUsers, getAllUsersAndTheirUsernames } = require("./helpers");

beforeEach(async () => {
  // await Blog.deleteMany({});
  await User.deleteMany({});

  // for (const blog of initialBlogs) {
  //   const blogObject = new Blog(blog);
  //   await blogObject.save();
  // }

  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.passwordHash, 10);
    const userObject = new User({ ...user, passwordHash });
    await userObject.save();
  }
});

test("a new user can be added", async () => {
  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen"
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const { usernames, response } = await getAllUsersAndTheirUsernames();

  expect(response.body).toHaveLength(initialUsers.length + 1);
  expect(usernames).toContain(newUser.username);
});

test("creation fails with proper status code and message if username or password is not provided", async () => {
  const newUser = {
    name: "Matti Luukkainen",
    password: "salainen"
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toBe("username and password fields are both required");

  const { response } = await getAllUsersAndTheirUsernames();

  expect(response.body).toHaveLength(initialUsers.length);
});

test("creation fails with proper status code and message if the password provided is invalid", async () => {
  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "sa"
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toBe("password must be at least 3 characters long");

  const { response } = await getAllUsersAndTheirUsernames();

  expect(response.body).toHaveLength(initialUsers.length);
});

test("creation fails with proper status code and message if username is already taken", async () => {
  const newUser = {
    username: "testuser",
    name: "Superuser",
    password: "salainen"
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toBe("Username must be unique and must have at least 3 letters");

  const { response } = await getAllUsersAndTheirUsernames();

  expect(response.body).toHaveLength(initialUsers.length);
});

afterAll(() => {
  mongoose.connection.close();
});

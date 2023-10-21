const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

const api = supertest(app);

const newId = new mongoose.mongo.ObjectId();

const initialBlogs = [
  {
    title: "Test Blog",
    author: newId,
    url: "https://test-url.com",
    likes: 10
  },
  {
    title: "Test Blog 2",
    author: newId,
    url: "https://test-url-2.com",
    likes: 20
  }
];

const initialUsers = [
  {
    username: "testuser",
    name: "Test User",
    passwordHash: "testpassword"
  },
  {
    username: "testuser2",
    name: "Test User 2",
    passwordHash: "testpassword2"
  }
];

const updatedBlog = {
  title: "Updated Title",
  author: newId,
  url: "https://updated-url.com",
  likes: 100
};

const getAllBlogsAndTheirTitles = async () => {
  const response = await api.get("/api/blogs");
  return {
    titles: response.body.map(blog => blog.title),
    response
  };
};

const getAllUsersAndTheirUsernames = async () => {
  const response = await api.get("/api/users");
  return {
    usernames: response.body.map(user => user.username),
    response
  };
};

const getFirstUserId = async () => {
  const { body } = await api.get("/api/users");
  const user = await User.findById(body[0].id);
  return user._id;
};

module.exports = {
  api,
  initialBlogs,
  initialUsers,
  updatedBlog,
  getAllBlogsAndTheirTitles,
  getAllUsersAndTheirUsernames,
  getFirstUserId
};

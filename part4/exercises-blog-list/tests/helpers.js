const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Test Blog",
    author: new mongoose.mongo.ObjectId(),
    url: "https://test-url.com",
    likes: 10
  },
  {
    title: "Test Blog 2",
    author: new mongoose.mongo.ObjectId(),
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
  url: "https://updated-url.com",
  likes: 100
};

const TOKEN_EXAMPLE =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI2NTM1NDA5ZTFlZTI3YjBiMWJkODM0MzEiLCJpYXQiOjE2OTgwOTQzNDl9.b_DsCtkgqO903LcniP6wGiOc9MJWIVQOgEZgi7ufMRY";

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
  TOKEN_EXAMPLE,
  getAllBlogsAndTheirTitles,
  getAllUsersAndTheirUsernames,
  getFirstUserId
};

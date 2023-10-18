const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Learning JS",
    author: "John Doe",
    url: "https://learning-js.com",
    likes: 20
  },
  {
    title: "Learning Testing",
    author: "Mary Doe",
    url: "https://learning-testing.com",
    likes: 10
  }
];

const getAllBlogsAndTheirTitles = async () => {
  const response = await api.get("/api/blogs");
  return {
    titles: response.body.map(blog => blog.title),
    response
  };
};

module.exports = { api, initialBlogs, getAllBlogsAndTheirTitles };

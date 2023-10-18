const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const { api, initialBlogs, getAllBlogsAndTheirTitles } = require("./helpers");

beforeEach(async () => {
  await Blog.deleteMany({});

  // parallel
  // const blogObjects = initialBlogs.map(blog => new Blog(blog));
  // const promisesArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promisesArray);

  // sequential
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs must have an unique identifier property called id", async () => {
    const { response } = await getAllBlogsAndTheirTitles();
    const result = response.body.every(blog => blog.id);
    expect(result).toBe(true);
  });
});

describe("POST /api/blogs", () => {
  test("a new blog can be added", async () => {
    const newBlog = {
      title: "Understanding async/await",
      author: "George Doe",
      url: "https://understanding-async-await.com",
      likes: 5
    };

    await api
      .post(`/api/blogs`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { titles, response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("if a new blog has not a property called likes it will be 0 by default", async () => {
    const newBlog = {
      title: "Understanding Express",
      author: "Anna Doe",
      url: "https://understanding-express.com"
    };

    const postResponse = await api
      .post(`/api/blogs`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(postResponse.body.likes).toBeDefined();
    expect(postResponse.body.likes).toEqual(0);

    const { titles, response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("if title and url fields are not provided server will respond with status 400", async () => {
    const newBlog = {
      author: "Michael Doe",
      likes: 15
    };

    await api.post(`/api/blogs`).send(newBlog).expect(400);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("DELETE api/blogs/:id", () => {
  test("a blog can be deleted", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const { titles, response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toHaveLength(initialBlogs.length - 1);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("a blog that do not exist can not be deleted", async () => {
    await api.delete("/api/blogs/65303920b351d52ae2e1def2").expect(404);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("if an invalid id is provided server will respond with status 400", async () => {
    await api.delete("/api/blogs/1234").expect(400);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

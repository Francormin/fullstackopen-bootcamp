const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");
const {
  api,
  initialBlogs,
  initialUsers,
  updatedBlog,
  TOKEN_EXAMPLE,
  getAllBlogsAndTheirTitles,
  getFirstUserId
} = require("./helpers");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // parallel
  // const blogObjects = initialBlogs.map(blog => new Blog(blog));
  // const promisesArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promisesArray);

  // sequential
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }

  for (const user of initialUsers) {
    const userObject = new User(user);
    await userObject.save();
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

describe("GET /api/blogs/:id", () => {
  test("a blog can be retrieved by its id", async () => {
    const { response } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = response;
    const blogToRetrieve = blogs[0];

    await api
      .get(`/api/blogs/${blogToRetrieve.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("if blog does not exist server will respond with status 404", async () => {
    await api.get(`/api/blogs/6531349eae8527db4bbf7131`).expect(404);
  });

  test("if an invalid id is provided server will respond with status 400", async () => {
    await api.get(`/api/blogs/1234`).expect(400);
  });
});

describe("POST /api/blogs", () => {
  test("if no token is provided by headers server will respond with status 401", async () => {
    const newBlog = {
      title: "Understanding async/await",
      author: await getFirstUserId(),
      url: "https://understanding-async-await.com",
      likes: 5
    };

    await api.post(`/api/blogs`).send(newBlog).expect(401);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a new blog can be added", async () => {
    const newBlog = {
      title: "Understanding async/await",
      url: "https://understanding-async-await.com",
      likes: 5
    };

    await api
      .post(`/api/blogs`)
      .send(newBlog)
      .set("Authorization", TOKEN_EXAMPLE)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { titles, response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("if a new blog has not a property called likes it will be 0 by default", async () => {
    const newBlog = {
      title: "Understanding Express",
      author: await getFirstUserId(),
      url: "https://understanding-express.com"
    };

    const postResponse = await api
      .post(`/api/blogs`)
      .send(newBlog)
      .set("Authorization", TOKEN_EXAMPLE)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(postResponse.body.likes).toBeDefined();
    expect(postResponse.body.likes).toEqual(0);

    const { titles, response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("if title or url fields are not provided server will respond with status 400", async () => {
    const newBlog = {
      title: "Understanding Node.js",
      likes: 15
    };

    await api.post(`/api/blogs`).send(newBlog).set("Authorization", TOKEN_EXAMPLE).expect(400);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("if no token is provided by headers server will respond with status 401", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const { titles, response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toHaveLength(initialBlogs.length);
    expect(titles).toContain(blogToDelete.title);
  });

  test("a blog can be deleted", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", TOKEN_EXAMPLE).expect(204);

    const { titles, response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toHaveLength(initialBlogs.length - 1);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("if blog does not exist server will respond with status 404", async () => {
    await api.delete("/api/blogs/6531349eae8527db4bbf7131").set("Authorization", TOKEN_EXAMPLE).expect(404);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("if an invalid id is provided server will respond with status 400", async () => {
    await api.delete("/api/blogs/1234").set("Authorization", TOKEN_EXAMPLE).expect(400);

    const { response } = await getAllBlogsAndTheirTitles();

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("if no token is provided by headers server will respond with status 401", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToUpdate = blogs[0];

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(401);

    const { response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toEqual(firstResponse.body);
  });

  test("a blog can be updated", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToUpdate = blogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set("Authorization", TOKEN_EXAMPLE)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { titles } = await getAllBlogsAndTheirTitles();

    expect(titles).not.toContain(blogToUpdate.title);
  });

  test("if no body is provided server will respond with status 400", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();
    const { body: blogs } = firstResponse;
    const blogToUpdate = blogs[0];

    await api.put(`/api/blogs/${blogToUpdate.id}`).send({}).set("Authorization", TOKEN_EXAMPLE).expect(400);

    const { response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toEqual(firstResponse.body);
  });

  test("if blog does not exist server will respond with status 404", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();

    await api
      .put("/api/blogs/6531349eae8527db4bbf7131")
      .send(updatedBlog)
      .set("Authorization", TOKEN_EXAMPLE)
      .expect(404);

    const { response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toEqual(firstResponse.body);
  });

  test("if an invalid id is provided server will respond with status 400", async () => {
    const { response: firstResponse } = await getAllBlogsAndTheirTitles();

    await api.put("/api/blogs/1234").send(updatedBlog).set("Authorization", TOKEN_EXAMPLE).expect(400);

    const { response: secondResponse } = await getAllBlogsAndTheirTitles();

    expect(secondResponse.body).toEqual(firstResponse.body);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

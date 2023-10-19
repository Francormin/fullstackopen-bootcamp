const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const blog = await Blog.findById(id);
    return blog ? response.json(blog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).send({ error: "title and url fields are both required" });

  if (request.body.likes === undefined) request.body.likes = 0;

  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return deletedBlog ? response.status(204).end() : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  if (!title && !author && !url && !likes) return response.status(400).send({ error: "nothing to update" });

  const blogToUpdate = { title, author, url, likes };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true });
    return updatedBlog ? response.json(updatedBlog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

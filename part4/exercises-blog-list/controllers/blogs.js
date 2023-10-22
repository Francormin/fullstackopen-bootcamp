const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("author", { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const blog = await Blog.findById(id).populate("author", { username: 1, name: 1 });
    return blog ? response.json(blog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !author || !url)
    return response.status(400).send({
      error: "title, author and url fields are required"
    });

  try {
    const user = await User.findById(author);
    if (!user) return response.status(404).end();

    const blog = new Blog({
      title,
      author: user._id,
      url,
      likes: likes || 0
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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
  const { title, url, likes } = request.body;

  if (!title && !url && !likes)
    return response.status(400).send({
      error: "nothing to update"
    });

  const blogToUpdate = {
    title,
    url,
    likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true });
    return updatedBlog ? response.json(updatedBlog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

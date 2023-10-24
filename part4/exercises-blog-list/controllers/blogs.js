const blogsRouter = require("express").Router();
const userExtractor = require("../middlewares/userExtractor");
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("author", {
      username: 1,
      name: 1
    });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const blog = await Blog.findById(id).populate("author", {
      username: 1,
      name: 1
    });

    return blog ? response.json(blog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  const { title, url, likes = 0 } = request.body;
  const { userId } = request;

  if (!title || !url)
    return response.status(400).send({
      error: "title and url fields are required"
    });

  try {
    const user = await User.findById(userId);
    if (!user) return response.status(404).end();

    const blog = new Blog({
      title,
      author: user._id,
      url,
      likes
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const { id } = request.params;
  const { userId } = request;

  try {
    const blog = await Blog.findById(id);

    if (blog && blog.author.toString() !== userId.toString()) {
      return response.status(401).end();
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return deletedBlog ? response.status(204).end() : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  const { id } = request.params;
  const { title, url, likes } = request.body;
  const { userId } = request;

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
    const blog = await Blog.findById(id);

    if (blog && blog.author.toString() !== userId.toString()) {
      return response.status(401).end();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, {
      new: true
    });

    return updatedBlog ? response.json(updatedBlog) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

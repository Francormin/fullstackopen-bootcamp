const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", (request, response, next) => {
  const { id } = request.params;

  Blog.findById(id)
    .then(blog => {
      if (blog) response.json(blog);
      else response.status(404).end();
    })
    .catch(error => {
      next(error);
    });
});

blogsRouter.post("/", async (request, response, next) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).send({ error: "title and url fields missing" });

  if (request.body.likes === undefined) request.body.likes = 0;
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// app.put("/:id", (request, response, next) => {
//   const { id } = request.params;
//   const { name, number } = request.body;

//   if (!name && !number) return response.status(400).send({ error: "There is nothing to update" });

//   const contactToUpdate = { name, number };

//   Contact.findByIdAndUpdate(id, contactToUpdate, { runValidators: true, new: true })
//     .then(updatedContact => {
//       if (updatedContact) response.json(updatedContact);
//       else response.status(404).end();
//     })
//     .catch(error => {
//       next(error);
//     });
// });

blogsRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const deletedContact = await Blog.findByIdAndDelete(id);
    return deletedContact ? response.status(204).end() : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

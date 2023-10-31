import React from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import displayMessage from "../utils/displayMessage";
import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog, removeBlog, handleMessageChange, user }) => {
  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      });

      updateBlog(updatedBlog);
    } catch (exception) {
      displayMessage(handleMessageChange, exception.response.data.error, true);
    }
  };

  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author.name}?`)) {
        await blogService.remove(blog.id);

        removeBlog(blog.id);

        displayMessage(handleMessageChange, "The blog has been removed successfully", false);
      }
    } catch (exception) {
      displayMessage(handleMessageChange, exception.response.statusText, true);
    }
  };

  const blogStyle = {
    padding: 10,
    border: "1px solid",
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div className="blog">{blog.title}</div>
      <Togglable buttonLabel="View" buttonLabel2="Hide">
        <p>Url: {blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
        <p>Author: {blog.author.name}</p>
        {blog.author.name === user?.name && (
          <button onClick={handleRemove} style={{ backgroundColor: "#0D61E4" }}>
            Remove
          </button>
        )}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;

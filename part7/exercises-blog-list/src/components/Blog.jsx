import { useDispatch } from "react-redux";

import { setNotification } from "../redux/reducers/notificationReducer";
import blogService from "../services/blogs";

import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      });

      updateBlog(updatedBlog);

      dispatch(setNotification(`The blog '${blog.title}' by ${blog.author.name} has been liked`, false, 5));
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };

  const handleRemove = async () => {
    try {
      if (window.confirm(`Are you sure you want to delete blog '${blog.title}'?`)) {
        await blogService.remove(blog.id);

        removeBlog(blog.id);

        dispatch(setNotification(`The blog '${blog.title}' has been deleted successfully`, false, 5));
      }
    } catch (exception) {
      exception.response
        ? dispatch(setNotification(exception.response.statusText, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
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
        <p>Author: {blog.author?.name}</p>
        {blog.author?.name === user?.name && (
          <button onClick={handleRemove} style={{ backgroundColor: "#0D61E4" }}>
            Delete
          </button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;

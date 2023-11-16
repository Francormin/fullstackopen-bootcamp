import { useDispatch } from "react-redux";

import { likeBlog, deleteBlog } from "../redux/reducers/blogReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import Togglable from "./Togglable";

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`The blog '${blog.title}' by ${blog.author.name} has been liked`, false, 5));
  };

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to delete blog '${blog.title}'?`)) {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`The blog '${blog.title}' has been deleted successfully`, false, 5));
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
        {blog.author?.name === loggedUser?.name && (
          <button onClick={handleRemove} style={{ backgroundColor: "#0D61E4" }}>
            Delete
          </button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;

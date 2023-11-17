import { useMutation, useQueryClient } from "react-query";

import { removeBlog, updateBlog } from "../services/blogs";
import { setNotification, useNotificationDispatch } from "../context/NotificationContext";
import { useLoggedUserValue } from "../context/LoggedUserContext";

import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const loggedUser = useLoggedUserValue();
  const dispatchNotification = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation(updateBlog);
  const removeBlogMutation = useMutation(removeBlog);

  const handleLike = async () => {
    updateBlogMutation.mutate(
      { ...blog, likes: blog.likes + 1 },
      {
        onSuccess: updatedBlog => {
          const blogs = queryClient.getQueryData("blogs");
          queryClient.setQueryData(
            "blogs",
            blogs.map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
          );

          setNotification(dispatchNotification, `The blog '${blog.title}' has been liked`, false);
        },
        onError: error => setNotification(dispatchNotification, error.response.data.error, true)
      }
    );
  };

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to delete blog '${blog.title}'?`)) {
      removeBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          const blogs = queryClient.getQueryData("blogs");
          queryClient.setQueryData(
            "blogs",
            blogs.filter(b => b.id !== blog.id)
          );

          setNotification(dispatchNotification, `The blog '${blog.title}' has been deleted`, false);
        },
        onError: error => setNotification(dispatchNotification, error.response.data.error, true)
      });
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

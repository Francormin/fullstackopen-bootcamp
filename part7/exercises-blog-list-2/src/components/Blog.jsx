import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getBlog, removeBlog, likeBlog, commentBlog } from "../services/blogs";
import { useSpinner } from "../hooks/useSpinner";
import { setNotification, useNotificationDispatch } from "../context/NotificationContext";
import { useLoggedUserValue } from "../context/LoggedUserContext";

import Spinner from "./Spinner";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSpinner();

  const loggedUser = useLoggedUserValue();
  const dispatchNotification = useNotificationDispatch();

  const queryClient = useQueryClient();
  const likeBlogMutation = useMutation(likeBlog);
  const commentBlogMutation = useMutation(commentBlog);
  const removeBlogMutation = useMutation(removeBlog);

  const { data: blog } = useQuery("blog", () => getBlog(id), {
    refetchOnWindowFocus: false,
    retry: 1
  });

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    likeBlogMutation.mutate(updatedBlog, {
      onSuccess: () => {
        setNotification(dispatchNotification, `The blog '${blog.title}' has been liked`, false);
        queryClient.setQueryData("blog", updatedBlog);
      },
      onError: error => setNotification(dispatchNotification, error.response.data.error, true)
    });
  };

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to delete blog '${blog.title}'?`)) {
      removeBlogMutation.mutate(blog.id, {
        onSuccess: () => navigate("/blogs"),
        onError: error => setNotification(dispatchNotification, error.response.data.error, true)
      });
    }
  };

  const handleComment = async event => {
    event.preventDefault();

    const comment = event.target.comment.value;
    if (!comment) return;

    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, comment]
    };

    commentBlogMutation.mutate(
      { id: updatedBlog.id, comment },
      {
        onSuccess: () => {
          setNotification(dispatchNotification, `The blog '${blog.title}' has been commented`, false);
          queryClient.setQueryData("blog", updatedBlog);
          event.target.comment.value = "";
        },
        onError: error => setNotification(dispatchNotification, error.response.data.error, true)
      }
    );
  };

  const blogStyle = {
    padding: 10,
    border: "1px solid",
    marginBottom: 5
  };

  return (
    <div>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : blog.message ? (
        <div>{blog.message}</div>
      ) : (
        <div style={blogStyle}>
          <h2>{blog.title}</h2>
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

          <h3>Comments</h3>
          <ul>
            {blog.comments?.map((comment, key) => (
              <li key={key}>{comment}</li>
            ))}
          </ul>

          <form onSubmit={handleComment}>
            <input type="text" name="comment" autoComplete="off" />
            <button type="submit">Add comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Blog;

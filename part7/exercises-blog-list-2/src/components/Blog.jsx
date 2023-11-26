import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

import { getBlog, removeBlog, likeBlog, commentBlog } from "../services/blogs";
import { useSpinner } from "../hooks/useSpinner";
import { setNotification, useNotificationDispatch } from "../context/NotificationContext";
import { useLoggedUser } from "../context/LoggedUserContext";

import Spinner from "./Spinner";
import "./Blog.css";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSpinner();

  const loggedUser = useLoggedUser();
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

  return (
    <div>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : blog.message ? (
        <div>{blog.message}</div>
      ) : (
        <div className="blogContainer">
          <Card className="cardContainer">
            <Card.Body>
              <Card.Title className="titleStyle">{blog.title}</Card.Title>
              <Card.Text>Url: {blog.url}</Card.Text>
              <Card.Text>
                Likes: {blog.likes} <Button onClick={handleLike}>Like</Button>
              </Card.Text>
              <Card.Text>Author: {blog.author?.name}</Card.Text>
              {blog.author?.name === loggedUser?.name && (
                <Button variant="danger" onClick={handleRemove}>
                  Delete
                </Button>
              )}
            </Card.Body>
            <Card.Footer>
              <Card.Title>Comments</Card.Title>
              <ul>
                {blog.comments?.map((comment, key) => (
                  <li key={key}>{comment}</li>
                ))}
              </ul>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Blog;

{
  /* <Card style={{ width: "18rem" }}>
  <Card.Body>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>; */
}

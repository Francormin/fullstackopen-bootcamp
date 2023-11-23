import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Form } from "react-bootstrap";

import { createBlog } from "../services/blogs";
import { setNotification, useNotificationDispatch } from "../context/NotificationContext";

import Togglable from "./Togglable";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const toggableRef = useRef();

  const dispatchNotification = useNotificationDispatch();

  const queryClient = useQueryClient();
  const createBlogMutation = useMutation(createBlog);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleLikesChange = event => {
    setLikes(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    createBlogMutation.mutate(
      {
        title,
        url,
        likes
      },
      {
        onSuccess: newBlog => {
          const blogs = queryClient.getQueryData("blogs");
          queryClient.setQueryData("blogs", blogs.concat(newBlog));

          setNotification(dispatchNotification, `A new blog '${title}' added`, false);
        },
        onError: error => setNotification(dispatchNotification, error.response.data.error, true)
      }
    );

    setTitle("");
    setUrl("");
    setLikes(0);

    toggableRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="New blog" buttonLabel2="Cancel" ref={toggableRef}>
      <div>
        <h2>Create a new blog</h2>

        <Form onSubmit={handleSubmit} className="mt-4 mx-auto w-75">
          <Form.Group>
            <Form.Label>Blog title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
              autoComplete="off"
              required
              className="text-center bg-light"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Blog url</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={url}
              onChange={handleUrlChange}
              autoComplete="off"
              required
              className="text-center bg-light"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Blog likes</Form.Label>
            <Form.Control
              type="number"
              name="likes"
              value={likes}
              min="0"
              onChange={handleLikesChange}
              className="text-center bg-light"
            />
          </Form.Group>

          <Button type="submit" variant="success" className="m-3">
            Create
          </Button>
        </Form>
      </div>
    </Togglable>
  );
};

export default BlogForm;

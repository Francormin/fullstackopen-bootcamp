import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "react-bootstrap/Button";

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

        <form onSubmit={handleSubmit}>
          <div>
            Title:{" "}
            <input type="text" value={title} name="title" onChange={handleTitleChange} autoComplete="off" required />
          </div>

          <div>
            Url: <input type="text" value={url} name="url" onChange={handleUrlChange} autoComplete="off" required />
          </div>

          <div>
            Likes:
            <input type="number" value={likes} min="0" name="likes" onChange={handleLikesChange} />
          </div>

          <Button type="submit" variant="success" className="m-3">
            Create
          </Button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;

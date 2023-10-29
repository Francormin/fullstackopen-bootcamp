import { useState, useRef } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const BlogForm = ({ createBlog, message, handleMessageChange }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const toggableRef = useRef();

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        url
      });

      createBlog(newBlog);

      handleMessageChange({
        content: `a new blog ${title} by ${newBlog.author.name} added`,
        error: false
      });

      setTimeout(() => {
        handleMessageChange({
          content: null,
          error: false
        });
      }, 5000);

      setTitle("");
      setUrl("");
      toggableRef.current.toggleVisibility();
    } catch (exception) {
      handleMessageChange({
        content: exception.response.data.error,
        error: true
      });

      setTimeout(() => {
        handleMessageChange({
          content: null,
          error: false
        });
      }, 5000);
    }
  };

  return (
    <Togglable buttonLabel="New blog" buttonLabel2="Cancel" ref={toggableRef}>
      <div>
        <h2>Create a new blog</h2>

        <form onSubmit={handleSubmit}>
          <div>
            Title: <input type="text" value={title} name="Title" onChange={handleTitleChange} />
          </div>

          <div>
            Url: <input type="text" value={url} name="Url" onChange={handleUrlChange} />
          </div>

          <button type="submit" disabled={!title || !url || message.content}>
            Create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;

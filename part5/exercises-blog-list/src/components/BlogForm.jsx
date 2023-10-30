import { useState, useRef } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import displayMessage from "../utils/displayMessage";

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

      displayMessage(handleMessageChange, { title, authorName: newBlog.author.name }, false);

      setTitle("");
      setUrl("");
      toggableRef.current.toggleVisibility();
    } catch (exception) {
      displayMessage(handleMessageChange, exception.response.data.error, true);
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

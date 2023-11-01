import { useState, useRef } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import displayMessage from "../utils/displayMessage";
import Togglable from "./Togglable";

const BlogForm = ({ createBlog, message, handleMessageChange }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const toggableRef = useRef();

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

    try {
      const newBlog = await blogService.create({
        title,
        url,
        likes
      });

      createBlog(newBlog);

      displayMessage(handleMessageChange, `A new blog ${title} by ${newBlog.author.name} added`, false);

      setTitle("");
      setUrl("");
      setLikes(0);

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
            Title: <input type="text" value={title} name="title" onChange={handleTitleChange} />
          </div>

          <div>
            Url: <input type="text" value={url} name="url" onChange={handleUrlChange} />
          </div>

          <div>
            Likes:
            <input type="number" value={likes} min="0" name="likes" onChange={handleLikesChange} />
          </div>

          <button type="submit" disabled={!title || !url || message.content}>
            Create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  handleMessageChange: PropTypes.func.isRequired
};

export default BlogForm;

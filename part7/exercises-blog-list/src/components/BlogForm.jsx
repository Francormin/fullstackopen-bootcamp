import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { setNotification } from "../redux/reducers/notificationReducer";
import blogService from "../services/blogs";

import Togglable from "./Togglable";

const BlogForm = ({ createBlog, notificationToShow }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const dispatch = useDispatch();

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

      dispatch(setNotification(`A new blog ${title} by ${newBlog.author.name} added`, false, 5));

      setTitle("");
      setUrl("");
      setLikes(0);

      toggableRef.current.toggleVisibility();
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
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

          <button type="submit" disabled={!title || !url || notificationToShow}>
            Create
          </button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;

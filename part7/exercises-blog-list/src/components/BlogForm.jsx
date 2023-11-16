import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "./../redux/reducers/blogReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import Togglable from "./Togglable";

const BlogForm = ({ notificationToShow }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const toggableRef = useRef();

  const dispatch = useDispatch();

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

    dispatch(
      createBlog({
        title,
        url,
        likes
      })
    );

    dispatch(setNotification(`A new blog '${title}' added`, false, 5));

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

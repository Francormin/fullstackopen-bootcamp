import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    content: null,
    error: false
  });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({
        content: exception.response.data.error,
        error: true
      });

      setTimeout(() => {
        setMessage({
          content: null,
          error: false
        });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    try {
      const returnedBlog = await blogService.create({
        title,
        url
      });

      setMessage({
        content: `a new blog ${title} by ${user.name} added`,
        error: false
      });

      setTimeout(() => {
        setMessage({
          content: null,
          error: false
        });
      }, 5000);

      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setUrl("");
    } catch (exception) {
      setMessage({
        content: exception.response.data.error,
        error: true
      });

      setTimeout(() => {
        setMessage({
          content: null,
          error: false
        });
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const returnedBlogs = await blogService.getAll();
      setBlogs(returnedBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>

          {message.content && <Message message={message} />}

          <LoginForm
            username={username}
            handleUsernameChange={setUsername}
            password={password}
            handlePasswordChange={setPassword}
            handleSubmit={handleLogin}
            message={message}
          />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>

          {message.content && <Message message={message} />}

          <p>
            {user.name} logged-in<button onClick={handleLogout}>Logout</button>
          </p>

          <BlogForm
            title={title}
            handleTitleChange={setTitle}
            url={url}
            handleUrlChange={setUrl}
            handleSubmit={handleCreate}
            message={message}
            ref={blogFormRef}
          />

          <br />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} userName={user.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ content: null, error: false });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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
      setMessage({ content: exception.response.data.error, error: true });
      setTimeout(() => {
        setMessage({ content: null, error: false });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async event => {
    event.preventDefault();

    try {
      const returnedBlog = await blogService.create({
        title,
        url
      });

      setMessage({ content: `a new blog ${title} by ${user.name} added`, error: false });
      setTimeout(() => {
        setMessage({ content: null, error: false });
      }, 5000);

      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setUrl("");
    } catch (exception) {
      setMessage({ content: exception.response.data.error, error: true });
      setTimeout(() => {
        setMessage({ content: null, error: false });
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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

          <form onSubmit={handleLogin}>
            <div>
              Username:{" "}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>

            <div>
              Password:{" "}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <button type="submit" disabled={!username || !password || message.content}>
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>

          {message.content && <Message message={message} />}

          <span>
            {user.name} logged-in<button onClick={handleLogout}>Logout</button>
          </span>

          <h2>Create a new blog</h2>

          <form onSubmit={handleCreate}>
            <div>
              Title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
            </div>

            <div>
              Url: <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
            </div>

            <button type="submit" disabled={!title || !url || message.content}>
              Create
            </button>
          </form>

          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

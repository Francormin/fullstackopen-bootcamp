import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState({
    content: null,
    error: false
  });

  const blogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const createBlog = newBlog => {
    blogFormRef.current.toggleVisibility();
    setBlogs(blogs.concat(newBlog));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsInDatabase = await blogService.getAll();
      setBlogs(blogsInDatabase);
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
        <LoginForm message={message} handleMessageChange={setMessage} handleUserChange={setUser} />
      ) : (
        <div>
          <h2>Blogs</h2>

          {message.content && <Message message={message} />}

          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>

          <BlogForm
            createBlog={createBlog}
            message={message}
            handleMessageChange={setMessage}
            reference={blogFormRef}
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

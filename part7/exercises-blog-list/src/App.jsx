import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "./redux/reducers/notificationReducer";
import blogService from "./services/blogs";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const createBlog = newBlog => {
    setBlogs(
      blogs.concat(newBlog).sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      })
    );
  };

  const updateBlog = updatedBlog => {
    setBlogs(
      blogs
        .map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => {
          if (a.likes < b.likes) {
            return 1;
          } else if (a.likes > b.likes) {
            return -1;
          } else {
            return 0;
          }
        })
    );
  };

  const removeBlog = id => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsInDatabase = await blogService.getAll();
        setBlogs(blogsInDatabase.sort((a, b) => (a.likes < b.likes ? 1 : -1)));
      } catch (exception) {
        exception.response?.data.error
          ? dispatch(setNotification(exception.response.data.error, true, 5))
          : dispatch(setNotification(exception.message, true, 5));
      }
    };

    user ? fetchBlogs() : null;
  }, [user, dispatch]);

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
        <LoginForm notificationToShow={notification} handleUserChange={setUser} />
      ) : (
        <div>
          <h2>Blogs</h2>

          {notification.content && <Notification notificationToShow={notification} />}

          <p>
            {user.name} logged-in <Logout handleUserChange={setUser} />
          </p>

          <BlogForm createBlog={createBlog} notificationToShow={notification.content} />

          <br />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

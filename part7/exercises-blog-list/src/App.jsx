import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./redux/reducers/blogReducer";
import { setLoggedUser } from "./redux/reducers/loginReducer";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const loggedUser = useSelector(state => state.loggedUser);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    loggedUser ? dispatch(initializeBlogs()) : null;
  }, [loggedUser, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUser(loggedUser));
    }
  }, [dispatch]);

  return (
    <div>
      {!Object.keys(loggedUser).length ? (
        <LoginForm notificationToShow={notification} />
      ) : (
        <div>
          <h2>Blogs</h2>

          {notification.content && <Notification notificationToShow={notification} />}

          <p>
            {loggedUser.name} logged-in <Logout />
          </p>

          <BlogForm notificationToShow={notification.content} />

          <br />
          {blogs
            .slice()
            .sort((a, b) => (a.likes < b.likes ? 1 : -1))
            .map(blog => (
              <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;

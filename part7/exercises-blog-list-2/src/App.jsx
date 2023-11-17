import { useEffect } from "react";
import { useQuery } from "react-query";

import { getBlogs } from "./services/blogs";
import { useLoggedUserDispatch, useLoggedUserValue } from "./context/LoggedUserContext";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

const App = () => {
  const { data: blogs, status } = useQuery("blogs", getBlogs, {
    refetchOnWindowFocus: false,
    retry: 1
  });

  const loggedUser = useLoggedUserValue();
  const dispatch = useLoggedUserDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);

      dispatch({
        type: "SET_LOGGED_USER",
        payload: loggedUser
      });
    }
  }, [dispatch]);

  return (
    <div>
      {!Object.keys(loggedUser).length ? (
        <LoginForm />
      ) : status === "error" ? (
        <div>blog service not available due to problems in server</div>
      ) : status === "loading" ? (
        <div>loading data...</div>
      ) : (
        <div>
          <h2>Blogs</h2>

          <Notification />

          <p>
            {loggedUser.name} logged-in <Logout />
          </p>
          <BlogForm />
          <br />
          {blogs
            .slice()
            .sort((a, b) => (a.likes < b.likes ? 1 : -1))
            .map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;

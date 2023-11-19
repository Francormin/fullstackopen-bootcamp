import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { setLoggedUser, useLoggedUserDispatch, useLoggedUserValue } from "./context/LoggedUserContext";
import { loggedUserJSON } from "./services/blogs";

import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import User from "./components/User";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Logout from "./components/Logout";

const App = () => {
  const loggedUser = useLoggedUserValue();
  const dispatchLogin = useLoggedUserDispatch();

  useEffect(() => {
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setLoggedUser(dispatchLogin, loggedUser);
    }
  }, [dispatchLogin]);

  const inlineStyles = {
    padding: 20
  };

  return (
    <div>
      {!Object.keys(loggedUser).length ? (
        <LoginForm />
      ) : (
        <BrowserRouter>
          <header style={{ backgroundColor: "lightgrey", padding: 10 }}>
            <Link to="/" style={inlineStyles}>
              Home
            </Link>
            <Link to="/users" style={inlineStyles}>
              Users
            </Link>
            <Link to="/blogs" style={inlineStyles}>
              Blogs
            </Link>
            <span style={inlineStyles}>
              {loggedUser.name} logged-in <Logout />
            </span>
          </header>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<User />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;

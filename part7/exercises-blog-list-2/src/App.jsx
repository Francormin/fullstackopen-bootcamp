import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import { setLoggedUser, useLoggedUserDispatch, useLoggedUserValue } from "./context/LoggedUserContext";
import { loggedUserJSON } from "./services/blogs";

import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Blog from "./components/Blog";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const loggedUser = useLoggedUserValue();
  const dispatchLogin = useLoggedUserDispatch();

  useEffect(() => {
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setLoggedUser(dispatchLogin, loggedUser);
    }
  }, [dispatchLogin]);

  return (
    <BrowserRouter>
      {!Object.keys(loggedUser).length ? (
        <LoginForm />
      ) : (
        <div>
          <Navbar collapseOnSelect expand="sm">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/users">Users</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/blogs">Blogs</Link>
                </Nav.Link>
                <span>
                  {loggedUser.name} logged-in <Logout />
                </span>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Notification />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<User />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/blogs/:id" element={<Blog />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;

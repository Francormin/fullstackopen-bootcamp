import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { setLoggedUser, useLoggedUser } from "./context/LoggedUserContext";

import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Home from "./components/Home";
import "./App.css";

const App = () => {
  const loggedUser = useLoggedUser();
  console.log(loggedUser);

  // useEffect(() => {
  //   if (loggedUserJSON) {
  //     const loggedUser = JSON.parse(loggedUserJSON);
  //     setLoggedUser(dispatchLogin, loggedUser);
  //   }
  // }, [dispatchLogin]);

  return (
    <div style={{ height: "inherit" }}>
      <BrowserRouter>
        <Routes>
          {loggedUser ? <Route element={<Home />} /> : <Route path={"/login"} element={<LoginForm />} />}

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<Blog />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

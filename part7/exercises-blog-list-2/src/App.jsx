import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useLoggedUserValue } from "./context/LoggedUserContext";

import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Home from "./components/Home";
import "./App.css";

const App = () => {
  const loggedUser = useLoggedUserValue();

  return (
    <div style={{ height: "inherit" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!loggedUser ? <LoginForm /> : <Navigate to="/" replace />} />
          <Route path="/" element={loggedUser ? <Layout /> : <Navigate to="/login" replace />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

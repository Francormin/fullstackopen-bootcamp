import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";

import { login } from "../services/login";
import { setToken } from "../services/blogs";

import { setNotification, useNotificationDispatch, useNotificationValue } from "../context/NotificationContext";
import { setLoggedUser, useLoggedUserDispatch } from "../context/LoggedUserContext";

import Notification from "./Notification";
import "./LoginForm.css";

const LoginForm = () => {
  console.log("entra al login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notification = useNotificationValue();
  const dispatchNotification = useNotificationDispatch();
  const dispatchLogin = useLoggedUserDispatch();

  const loginMutation = useMutation(login);
  const navigate = useNavigate();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!username.length || !password.length) return;

    loginMutation.mutate(
      {
        username,
        password
      },
      {
        onSuccess: responseObj => {
          if (responseObj.response?.status === 401) {
            setNotification(dispatchNotification, responseObj.response.data.error, true);
            setPassword("");
          } else {
            setLoggedUser(dispatchLogin, responseObj);
            setToken(responseObj);
            setUsername("");
            setPassword("");
            navigate("/");
          }
        }
      }
    );
  };

  return (
    <div className="loginFormContainer">
      <h2 className="title">Log in to application</h2>

      {notification.content && <Notification />}

      <Form onSubmit={handleSubmit} className="loginForm">
        <FloatingLabel label="Username">
          <Form.Control
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
            className="mb-3"
            placeholder="Username"
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Password">
          <Form.Control
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            className="mb-4"
            placeholder="Password"
            required
          />
        </FloatingLabel>

        <Button type="submit" variant="outline-light" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

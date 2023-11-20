import { useState } from "react";
import { useMutation } from "react-query";

import { login } from "../services/login";
import { setToken } from "../services/blogs";

import { setNotification, useNotificationDispatch, useNotificationValue } from "../context/NotificationContext";
import { setLoggedUser, useLoggedUserDispatch } from "../context/LoggedUserContext";

import Notification from "./Notification";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notification = useNotificationValue();
  const dispatchNotification = useNotificationDispatch();
  const dispatchLogin = useLoggedUserDispatch();

  const loginMutation = useMutation(login);

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
          }
        }
      }
    );
  };

  return (
    <div>
      <h2>Log in to application</h2>

      {notification.content && <Notification />}

      <form onSubmit={handleSubmit}>
        <div>
          Username: <input type="text" value={username} name="username" onChange={handleUsernameChange} required />
        </div>

        <div>
          Password: <input type="password" value={password} name="password" onChange={handlePasswordChange} required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

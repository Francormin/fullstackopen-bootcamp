import { useState } from "react";
import { useDispatch } from "react-redux";

import { setNotification } from "../redux/reducers/notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

import Notification from "./Notification";

const LoginForm = ({ notificationToShow, handleUserChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      handleUserChange(user);
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, true, 5));
      setPassword("");
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      {notificationToShow.content && <Notification notificationToShow={notificationToShow} />}

      <form onSubmit={handleSubmit}>
        <div>
          Username: <input type="text" value={username} name="username" onChange={handleUsernameChange} />
        </div>

        <div>
          Password: <input type="password" value={password} name="password" onChange={handlePasswordChange} />
        </div>

        <button type="submit" disabled={!username || !password || notificationToShow.content}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

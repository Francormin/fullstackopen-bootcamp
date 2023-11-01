import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import blogService from "../services/blogs";
import displayMessage from "../utils/displayMessage";
import Message from "./Message";

const LoginForm = ({ message, handleMessageChange, handleUserChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      displayMessage(handleMessageChange, exception.response.data.error, true);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      {message.content && <Message message={message} />}

      <form onSubmit={handleSubmit}>
        <div>
          Username: <input type="text" value={username} name="username" onChange={handleUsernameChange} />
        </div>

        <div>
          Password: <input type="password" value={password} name="password" onChange={handlePasswordChange} />
        </div>

        <button type="submit" disabled={!username || !password || message.content}>
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  message: PropTypes.object.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  handleUserChange: PropTypes.func.isRequired
};

export default LoginForm;

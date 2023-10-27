import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
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
      handleMessageChange({
        content: exception.response.data.error,
        error: true
      });

      setTimeout(() => {
        handleMessageChange({
          content: null,
          error: false
        });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      {message.content && <Message message={message} />}

      <form onSubmit={handleSubmit}>
        <div>
          Username: <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>

        <div>
          Password: <input type="password" value={password} name="Password" onChange={handlePasswordChange} />
        </div>

        <button type="submit" disabled={!username || !password || message.content}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
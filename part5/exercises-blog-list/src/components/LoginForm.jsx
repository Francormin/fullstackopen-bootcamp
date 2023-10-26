const LoginForm = ({ username, handleUsernameChange, password, handlePasswordChange, handleSubmit, message }) => (
  <form onSubmit={handleSubmit}>
    <div>
      Username:{" "}
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
    </div>

    <div>
      Password:{" "}
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
    </div>

    <button type="submit" disabled={!username || !password || message.content}>
      Login
    </button>
  </form>
);

export default LoginForm;

import { useEffect, useState } from "react";
import useLoginMutation from "../hooks/useLoginMutation";

const LoginForm = ({ show, error, setError, setPage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLoginMutation({
    onCompleted: data => handleLoginSuccess(data),
    onError: error => handleLoginError(error)
  });

  const handleLoginSuccess = data => {
    setToken(data.login.value);
    window.localStorage.setItem("user-token", data.login.value);
    setPage("authors");
    setUsername("");
    setPassword("");
    setError(null);
  };

  const handleLoginError = error => {
    if (error.networkError) {
      setError(error.networkError.result.errors[0].message);
      setPassword("");
    }
  };

  const submit = async event => {
    event.preventDefault();

    login({
      variables: {
        username,
        password
      }
    });
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(errorTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

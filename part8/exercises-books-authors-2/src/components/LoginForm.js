import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: error => {
      if (error.networkError) {
        props.setError(error.networkError.result.errors[0].message);

        setTimeout(() => {
          props.setError(null);
        }, 5000);

        setPassword("");
      }

      console.error(error);
    },
    onCompleted: data => {
      props.setToken(data.login.value);
      window.localStorage.setItem("user-token", data.login.value);

      props.setPage("authors");
      props.setError(null);

      setUsername("");
      setPassword("");
    }
  });

  const submit = async event => {
    event.preventDefault();

    login({
      variables: {
        username,
        password
      }
    });
  };

  if (!props.show) {
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

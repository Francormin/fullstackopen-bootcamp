import { useLoggedUserDispatch } from "../context/LoggedUserContext";
import { setToken } from "../services/blogs";

const Logout = () => {
  const dispatchLogout = useLoggedUserDispatch();

  const handleLogout = () => {
    dispatchLogout({
      type: "SET_LOGGED_USER",
      payload: {}
    });

    setToken({});
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

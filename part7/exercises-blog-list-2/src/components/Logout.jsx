import { setLoggedUser, useLoggedUserDispatch } from "../context/LoggedUserContext";
import { setToken } from "../services/blogs";

const Logout = () => {
  const dispatchLogout = useLoggedUserDispatch();

  const handleLogout = () => {
    setLoggedUser(dispatchLogout, {});
    setToken({});
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

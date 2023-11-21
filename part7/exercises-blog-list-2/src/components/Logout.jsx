import { setLoggedUser, useLoggedUserDispatch } from "../context/LoggedUserContext";
import { setToken } from "../services/blogs";
import "./Logout.css";

const Logout = () => {
  const dispatchLogout = useLoggedUserDispatch();

  const handleLogout = () => {
    setLoggedUser(dispatchLogout, {});
    setToken({});
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: 10
      }}
      className="logoutButton"
    >
      Logout
    </button>
  );
};

export default Logout;

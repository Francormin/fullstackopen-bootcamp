import Button from "react-bootstrap/Button";

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
    <Button variant="danger" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

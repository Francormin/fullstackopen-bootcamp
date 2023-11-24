import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { removeLoggedUser, useLoggedUserDispatch } from "../context/LoggedUserContext";
import { setToken } from "../services/blogs";

const Logout = () => {
  const navigate = useNavigate();
  const dispatchLogout = useLoggedUserDispatch();

  const handleLogout = () => {
    removeLoggedUser(dispatchLogout);
    setToken({});
    navigate("/login");
  };

  return (
    <Button variant="danger" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

import { Outlet } from "react-router-dom";

import { useLoggedUser } from "../context/LoggedUserContext";
import NavbarComponent from "./NavbarComponent";
import LoginForm from "./LoginForm";

const Layout = () => {
  const loggedUser = useLoggedUser();

  if (loggedUser === undefined) return <LoginForm />;

  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default Layout;

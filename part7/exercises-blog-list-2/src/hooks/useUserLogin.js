import { useEffect, useState } from "react";
import { useLoggedUserDispatch, setLoggedUser } from "../context/LoggedUserContext";
import { loggedUserJSON } from "../services/blogs";

export const useUserLogin = () => {
  const dispatchLogin = useLoggedUserDispatch();
  const [loggedUser, setLoggedUserState] = useState({});

  useEffect(() => {
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setLoggedUser(dispatchLogin, loggedUser);
      setLoggedUserState(parsedUser);
    }
  }, [dispatchLogin, loggedUser]);

  return loggedUser;
};

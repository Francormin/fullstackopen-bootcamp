import { createContext, useContext, useReducer } from "react";

const LoggedUserReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return action.payload;
    default:
      return state;
  }
};

const LoggedUserContext = createContext();

export const LoggedUserContextProvider = props => {
  const [loggedUser, loggedUserDispatch] = useReducer(LoggedUserReducer, {});

  return (
    <LoggedUserContext.Provider value={[loggedUser, loggedUserDispatch]}>{props.children}</LoggedUserContext.Provider>
  );
};

export const useLoggedUserValue = () => {
  const loggedUserAndDispatch = useContext(LoggedUserContext);
  return loggedUserAndDispatch[0];
};

export const useLoggedUserDispatch = () => {
  const loggedUserAndDispatch = useContext(LoggedUserContext);
  return loggedUserAndDispatch[1];
};

export const setLoggedUser = (dispatch, user) => {
  dispatch({ type: "SET_LOGGED_USER", payload: user });
};

export default LoggedUserContext;

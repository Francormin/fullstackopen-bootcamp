import { createContext, useContext, useReducer } from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, {
    content: null,
    error: false
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

let timeoutId;
export const setNotification = (dispatch, content, error) => {
  clearTimeout(timeoutId);
  dispatch({ type: "SET_NOTIFICATION", payload: { content, error } });
  timeoutId = setTimeout(() => {
    dispatch({ type: "SET_NOTIFICATION", payload: { content: null, error: false } });
  }, 5000);
};

export default NotificationContext;

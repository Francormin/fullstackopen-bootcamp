import { createSlice } from "@reduxjs/toolkit";

import loginService from "../../services/login";
import blogService from "../../services/blogs";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setLoggedUser: (state, action) => {
      return action.payload;
    }
  }
});

export const { setLoggedUser } = loginSlice.actions;

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatch(setLoggedUser(loggedUser));
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setLoggedUser({}));
  };
};

export default loginSlice.reducer;

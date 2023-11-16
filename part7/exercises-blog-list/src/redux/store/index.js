import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "../reducers/blogReducer";
import loginReducer from "../reducers/loginReducer";
import notificationReducer from "../reducers/notificationReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedUser: loginReducer,
    notification: notificationReducer
  }
});

export default store;

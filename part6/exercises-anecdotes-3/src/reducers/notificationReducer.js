import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationChange: (state, action) => {
      return action.payload;
    }
  }
});

let timeoutId;
export const setNotification = (message, seconds) => {
  return dispatch => {
    clearTimeout(timeoutId);

    dispatch(notificationChange(message));

    timeoutId = setTimeout(() => {
      dispatch(notificationChange(""));
    }, seconds * 1000);
  };
};

export const { notificationChange } = notificationReducer.actions;

export default notificationReducer.reducer;

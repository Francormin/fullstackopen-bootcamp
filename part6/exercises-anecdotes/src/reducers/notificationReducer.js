import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationChange: (state, action) => {
      return action.payload;
    }
  }
});

export const { notificationChange } = notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(notificationChange(message));

    setTimeout(() => {
      dispatch(notificationChange(""));
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

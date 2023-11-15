import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: {
    content: null,
    error: false
  },
  reducers: {
    notificationChange: (state, action) => {
      return action.payload;
    }
  }
});

export const { notificationChange } = notificationReducer.actions;

let timeoutId;
export const setNotification = (content, error, seconds) => {
  return dispatch => {
    clearTimeout(timeoutId);

    dispatch(
      notificationChange({
        content,
        error
      })
    );

    timeoutId = setTimeout(() => {
      dispatch(
        notificationChange({
          content: null,
          error: false
        })
      );
    }, seconds * 1000);
  };
};

export default notificationReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogLikes(state, action) {
      const id = action.payload;
      const blogToChange = state.find(blog => blog.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      };
      return state.map(blog => (blog.id !== id ? blog : changedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    }
  }
});

export const { setBlogs, addBlog, updateBlogLikes, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog);
      dispatch(updateBlogLikes(updatedBlog.id));
    } catch (exception) {
      exception.response?.data.error
        ? dispatch(setNotification(exception.response.data.error, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
    } catch (exception) {
      exception.response
        ? dispatch(setNotification(exception.response.statusText, true, 5))
        : dispatch(setNotification(exception.message, true, 5));
    }
  };
};

export default blogSlice.reducer;

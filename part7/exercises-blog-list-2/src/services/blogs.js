import axios from "axios";

const BASE_URL = "http://localhost:3003/api/blogs";

const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
let { token } = !!loggedUserJSON && JSON.parse(loggedUserJSON);
let config = {};

if (token) {
  config = {
    headers: { Authorization: `bearer ${token}` }
  };
}

export const setToken = user => {
  token = user.token;
  if (token) {
    config = {
      headers: { Authorization: `bearer ${token}` }
    };
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  } else {
    config = {};
    window.localStorage.removeItem("loggedBlogappUser");
  }
};

export const getBlogs = () => axios.get(BASE_URL).then(res => res.data);

export const createBlog = newBlog => axios.post(BASE_URL, newBlog, config).then(res => res.data);

export const updateBlog = updatedBlog =>
  axios.put(`${BASE_URL}/${updatedBlog.id}`, updatedBlog, config).then(res => res.data);

export const removeBlog = id => axios.delete(`${BASE_URL}/${id}`, config);

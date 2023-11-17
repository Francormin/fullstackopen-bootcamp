import axios from "axios";

const BASE_URL = "http://localhost:3003/api/blogs";

let token = null;
let config = {};

export const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token }
  };
};

export const getBlogs = () => axios.get(BASE_URL).then(res => res.data);

export const createBlog = newBlog => axios.post(BASE_URL, newBlog, config).then(res => res.data);

export const updateBlog = updatedBlog =>
  axios.put(`${BASE_URL}/${updatedBlog.id}`, updatedBlog, config).then(res => res.data);

export const removeBlog = id => axios.delete(`${BASE_URL}/${id}`, config);

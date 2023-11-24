import axios from "axios";
import { getLoggedUser } from "../context/LoggedUserContext";

const BASE_URL = "http://localhost:3003/api/blogs";

const user = getLoggedUser();
let token;
let config = {};

if (user?.token) {
  config = {
    headers: { Authorization: `bearer ${user?.token}` }
  };
}

export const setToken = user => {
  token = user.token;
  if (token) {
    config = {
      headers: { Authorization: `bearer ${token}` }
    };
  } else {
    config = {};
  }
};

export const getBlogs = () => axios.get(BASE_URL).then(res => res.data);

export const getBlog = id =>
  axios
    .get(`${BASE_URL}/${id}`)
    .then(res => res.data)
    .catch(error =>
      error.response.status === 404 || error.response.status === 400 ? { message: "blog not found" } : null
    );

export const createBlog = newBlog => axios.post(BASE_URL, newBlog, config).then(res => res.data);

export const commentBlog = ({ id, comment }) =>
  axios.post(`${BASE_URL}/${id}/comments`, { comment }, config).then(res => res.data);

export const likeBlog = updatedBlog =>
  axios.put(`${BASE_URL}/${updatedBlog.id}`, updatedBlog, config).then(res => res.data);

export const removeBlog = id => axios.delete(`${BASE_URL}/${id}`, config);

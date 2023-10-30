import axios from "axios";

const BASE_URL = "http://localhost:3003/api/blogs";

let token = null;
let config = {};

const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token }
  };
};

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const create = async newObject => {
  const response = await axios.post(BASE_URL, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${BASE_URL}/${id}`, newObject, config);
  return response.data;
};

const remove = async id => {
  await axios.delete(`${BASE_URL}/${id}`, config);
};

export default { setToken, getAll, create, update, remove };

import axios from "axios";

const BASE_URL = "http://localhost:3003/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(BASE_URL, newObject, config);
  return response.data;
};

// const update = (id, newObject) => {
//   const request = axios.put(`${BASE_URL}/${id}`, newObject);
//   return request.then(response => response.data);
// };

export default { setToken, getAll, create };

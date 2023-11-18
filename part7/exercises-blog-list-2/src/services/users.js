import axios from "axios";

const BASE_URL = "http://localhost:3003/api/users";

export const getUsers = () => axios.get(BASE_URL).then(res => res.data);

export const getUser = id => axios.get(`${BASE_URL}/${id}`).then(res => res.data);

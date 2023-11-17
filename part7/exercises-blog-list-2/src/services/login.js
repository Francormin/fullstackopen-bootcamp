import axios from "axios";

const BASE_URL = "http://localhost:3003/api/login";

export const login = credentials => axios.post(BASE_URL, credentials).then(res => res.data);

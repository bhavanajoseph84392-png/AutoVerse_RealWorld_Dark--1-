import axios from "axios";

const api = axios.create({
  baseURL: "https://autoverse-realworld-dark-1-2.onrender.com",
});

export default api;
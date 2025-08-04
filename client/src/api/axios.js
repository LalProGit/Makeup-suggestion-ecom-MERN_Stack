import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"));
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});

export default API;

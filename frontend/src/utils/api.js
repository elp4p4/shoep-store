import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
      console.log("Request headers:", config.headers); // Debug log
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

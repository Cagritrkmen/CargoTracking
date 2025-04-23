import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Her isteğe otomatik token ekle
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

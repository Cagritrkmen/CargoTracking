import axios from "axios";
import toast from "react-hot-toast";

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

// 401 hatası için global toast
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Oturum süresi doldu, lütfen tekrar giriş yapın.");
    }
    return Promise.reject(error);
  }
);

export default instance;

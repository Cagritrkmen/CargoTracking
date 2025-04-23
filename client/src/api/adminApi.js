import axios from "./axiosInstance";

export const loginAdmin = async ({ username, password }) => {
  const res = await axios.post("/admin/login", { username, password });
  return res.data;
};

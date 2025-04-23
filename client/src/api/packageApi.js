import axios from "./axiosInstance";

// Tüm kargoları getir
export const getAllPackages = async () => {
  const res = await axios.get("/packages");
  return res.data;
};

// Takip numarasıyla güncelleme
export const updatePackage = async (trackingNumber, payload) => {
  const res = await axios.put(`/packages/track/${trackingNumber}`, payload);
  return res.data;
};

// Takip numarasıyla silme
export const deletePackage = async (trackingNumber) => {
  const res = await axios.delete(`/packages/track/${trackingNumber}`);
  return res.data;
};

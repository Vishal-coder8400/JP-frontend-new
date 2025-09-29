import api from "../../lib/axios";

export const uploadProfileImageForAdmin = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/admin/upload/profile-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createAdmin = (data) => api.post("/admin-management/create", data);

export const getAllAdmins = () => api.get("/admin-management/list");

export const getAdminById = (adminId) =>
  api.get(`/admin-management/${adminId}`);

export const updateAdmin = (adminId, data) =>
  api.put(`/admin-management/${adminId}`, data);

export const deleteAdmin = (adminId) =>
  api.delete(`/admin-management/${adminId}`);

export const getFeatures = () => {
  return api.get("/admin-management/features");
};

import api from "../../lib/axios";

export const uploadProfileImageForAdmin = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/api/v1/admin/upload/profile-images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const createAdmin = (data) =>
  api.post("/api/v1/admin-management/create", data);

export const getAllAdmins = () => api.get("/api/v1/admin-management/list");

export const getAdminById = (adminId) =>
  api.get(`/api/v1/admin-management/${adminId}`);

export const updateAdmin = (adminId, data) =>
  api.put(`/api/v1/admin-management/${adminId}`, data);

export const deleteAdmin = (adminId) =>
  api.delete(`/api/v1/admin-management/${adminId}`);

export const getFeatures = () => {
  return api.get("/api/v1/admin-management/features");
};

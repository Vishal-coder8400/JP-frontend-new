import api from "../../lib/axios";
import { createUpload, createPost, createDelete } from "./baseApi";

export const uploadProfileImageForAdmin = createUpload(
  "/admin/upload/profile-images"
);

export const createAdmin = createPost("/admin-management/create");

export const getAllAdmins = async ({ signal } = {}) => {
  const response = await api.get("/admin-management/list", { signal });
  return response.data;
};

export const getAdminById = async (adminId, { signal } = {}) => {
  const response = await api.get(`/admin-management/${adminId}`, { signal });
  return response.data;
};

export const updateAdmin = async (adminId, data) => {
  const response = await api.put(`/admin-management/${adminId}`, data);
  return response.data;
};

export const deleteAdmin = createDelete("/admin-management");

export const getFeatures = async ({ signal } = {}) => {
  const response = await api.get("/admin-management/features", { signal });
  return response.data;
};

import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getFeatures,
  uploadProfileImageForAdmin,
} from "../../api/super-admin/adminManagement";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import {
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  useBaseMutation,
} from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllAdmins = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.admins, getAllAdmins, params);
};

export const useGetAdminById = (id, options = {}) => {
  return useBaseDetailsQuery(QUERY_KEYS.admin, getAdminById, id, options);
};

export const useCreateAdmin = () => {
  return useCreateMutation(createAdmin, "Admin", ["superAdmin-admins"]);
};

export const useUpdateAdmin = () => {
  return useUpdateMutation(
    ({ adminId, data }) => updateAdmin(adminId, data),
    "Admin",
    ["superAdmin-admins"]
  );
};

export const useDeleteAdmin = () => {
  return useDeleteMutation(deleteAdmin, "Admin", ["superAdmin-admins"]);
};

export const useGetFeatures = () => {
  return useBaseListQuery(
    QUERY_KEYS.features,
    getFeatures,
    {},
    { staleTime: 5 * 60 * 1000 }
  );
};

export const useProfileImageUpload = () => {
  return useBaseMutation(uploadProfileImageForAdmin, {
    successMessage: "Profile image uploaded successfully",
    errorMessage: "Failed to upload profile image",
  });
};

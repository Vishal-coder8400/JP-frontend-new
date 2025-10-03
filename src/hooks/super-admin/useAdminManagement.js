import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getFeatures,
  uploadProfileImageForAdmin,
} from "../../api/super-admin/adminManagement";
import { toast } from "sonner";

export const useGetAllAdmins = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-admins", params],
    queryFn: ({ signal }) => getAllAdmins(),
    keepPreviousData: true,
  });
};

export const useGetAdminById = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-admin", id],
    queryFn: ({ signal }) => getAdminById(id, { signal }),
    enabled: enabled && !!id,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      toast.success(data.message || "Admin created successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-admins"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create admin");
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ adminId, data }) => updateAdmin(adminId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Admin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-admins"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update admin");
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: (data) => {
      toast.success(data.message || "Admin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-admins"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    },
  });
};

export const useGetFeatures = () => {
  return useQuery({
    queryKey: ["superAdmin-features"],
    queryFn: async ({ signal }) => {
      const response = await getFeatures({ signal });
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProfileImageUpload = () => {
  return useMutation({
    mutationFn: uploadProfileImageForAdmin,
    onSuccess: (data) => {
      toast.success("Profile image uploaded successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to upload profile image"
      );
    },
  });
};

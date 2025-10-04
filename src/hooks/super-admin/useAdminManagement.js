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
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-admins", token, params],
    queryFn: ({ signal }) => getAllAdmins({ signal }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetAdminById = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-admin", token, id],
    queryFn: ({ signal }) => getAdminById(id, { signal }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-features", token],
    queryFn: async ({ signal }) => {
      const response = await getFeatures({ signal });
      return response;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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

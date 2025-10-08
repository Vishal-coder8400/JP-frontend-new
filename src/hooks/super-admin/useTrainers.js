import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from "../../api/super-admin/database";
import { toast } from "sonner";

export const useGetAllTrainers = (enabled = true) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-trainers", token],
    queryFn: ({ signal }) => getAllTrainers({ signal }),
    enabled: enabled && !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetTrainerDetails = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-trainer", token, id],
    queryFn: ({ signal }) => getTrainerById({ signal, id }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useUpdateTrainer = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: ({ id, data }) => updateTrainer({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Trainer updated successfully!");

      // Invalidate and refetch trainer details with proper queryKey
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-trainer", token, variables.id],
      });

      // Invalidate and refetch trainers list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-trainers"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update trainer");
    },
  });
};

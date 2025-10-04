import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainings,
  getTrainingById,
  updateTraining,
} from "../../api/super-admin/jobsAndTrainings";
import { toast } from "sonner";

export const useGetAllTrainings = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-trainings", token, params],
    queryFn: ({ signal }) => getAllTrainings({ signal, ...params }),
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

export const useGetTrainingDetails = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-training", token, id],
    queryFn: ({ signal }) => getTrainingById({ signal, id }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTraining({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Training updated successfully!");

      // Invalidate and refetch training details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-training", variables.id],
      });

      // Invalidate and refetch trainings list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-trainings"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update training");
    },
  });
};

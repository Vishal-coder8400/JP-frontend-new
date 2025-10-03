import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainings,
  getTrainingById,
  updateTraining,
} from "../../api/super-admin/jobsAndTrainings";
import { toast } from "sonner";

export const useGetAllTrainings = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainings", params],
    queryFn: ({ signal }) => getAllTrainings({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetTrainingDetails = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-training", id],
    queryFn: ({ signal }) => getTrainingById({ signal, id }),
    enabled: enabled && !!id,
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

import {
  applyForTraining,
  getAllTrainings,
  getTrainingbtId,
} from "@/api/trainer/training";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllTrainings = (filter) => {
  return useQuery({
    queryKey: ["trainings", filter],
    queryFn: getAllTrainings,
    retry: false,
    keepPreviousData: true,
  });
};

export const useGetTrainingById = (id) => {
  return useQuery({
    queryKey: ["training", id],
    queryFn: ({ signal }) => getTrainingbtId({ id, signal }),
    enabled: !!id,
  });
};

export const useApplyForTraining = (data) => {
  return useMutation({
    mutationFn: (data) => applyForTraining(data),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Applied for training successfully");
    },
    onError: (error) => {
      console.error("Error applying for training:", error);
      toast.error(
        error?.response?.data?.message || "Failed to apply for training"
      );
    },
  });
};

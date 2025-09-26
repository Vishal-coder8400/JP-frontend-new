import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
  getTrainingsApplications,
  getTrainingDetails,
} from "../../api/super-admin/training";
import { toast } from "sonner";

export const useGetAllTrainings = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainings", params],
    queryFn: ({ signal }) => getAllTrainings({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetTrainingById = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-training", id],
    queryFn: ({ signal }) => getTrainingById({ signal, id }),
    enabled: enabled && !!id,
  });
};

export const useGetTrainingsApplications = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainings-applications", params],
    queryFn: ({ signal }) => getTrainingsApplications({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetTrainingDetails = (trainingId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-training-details", trainingId],
    queryFn: ({ signal }) => getTrainingDetails({ signal, trainingId }),
    enabled: enabled && !!trainingId,
  });
};

export const useCreateTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTraining,
    onSuccess: () => {
      toast.success("Training created successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainings"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create training");
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTraining,
    onSuccess: (data, variables) => {
      toast.success("Training updated successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainings"] });
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-training", variables.id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update training");
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => {
      toast.success("Training deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainings"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete training");
    },
  });
};

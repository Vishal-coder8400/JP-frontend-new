import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from "../../api/super-admin/database";
import { toast } from "sonner";

export const useGetAllTrainers = () => {
  return useQuery({
    queryKey: ["superAdmin-trainers"],
    queryFn: ({ signal }) => getAllTrainers({ signal }),
    keepPreviousData: true,
  });
};

export const useGetTrainerDetails = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainer", id],
    queryFn: ({ signal }) => getTrainerById({ signal, id }),
    enabled: enabled && !!id,
  });
};

export const useUpdateTrainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTrainer({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Trainer updated successfully!");

      // Invalidate and refetch trainer details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-trainer", variables.id],
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

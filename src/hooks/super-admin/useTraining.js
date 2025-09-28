import { useQuery } from "@tanstack/react-query";
import {
  getAllTrainings,
  getTrainingById,
} from "../../api/super-admin/jobsAndTrainings";

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

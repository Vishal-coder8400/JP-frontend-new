import {
  getAllTrainings,
  getTrainingById,
  updateTraining,
} from "../../api/super-admin/jobsAndTrainings";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useUpdateMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllTrainings = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.trainings, getAllTrainings, params);
};

export const useGetTrainingDetails = (id, options = {}) => {
  return useBaseDetailsQuery(QUERY_KEYS.training, getTrainingById, id, options);
};

export const useUpdateTraining = () => {
  return useUpdateMutation(
    ({ id, data }) => updateTraining({ id, data }),
    "Training",
    ["superAdmin-trainings", "superAdmin-training"]
  );
};

import {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from "../../api/super-admin/database";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useUpdateMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllTrainers = (params = {}, enabled = true) => {
  return useBaseListQuery(QUERY_KEYS.trainers, getAllTrainers, params, {
    enabled,
  });
};

export const useGetTrainerDetails = (id, options = {}) => {
  return useBaseDetailsQuery(QUERY_KEYS.trainer, getTrainerById, id, options);
};

export const useUpdateTrainer = () => {
  return useUpdateMutation(
    ({ id, data }) => updateTrainer({ id, data }),
    "Trainer",
    ["superAdmin-trainers", "superAdmin-trainer"]
  );
};

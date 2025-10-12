import { useBaseListQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";
import {
  getJobApplications,
  getTrainingApplications,
} from "../../api/super-admin/jobsAndTrainings";

export const useGetApplications = (jobId, type, params = {}, options = {}) => {
  const queryKey =
    type === "training"
      ? QUERY_KEYS.applications.training
      : QUERY_KEYS.applications.job;

  const queryFn =
    type === "training" ? getTrainingApplications : getJobApplications;

  return useBaseListQuery(
    queryKey,
    queryFn,
    { id: jobId, ...params },
    {
      enabled: !!jobId && !!type,
      ...options,
    }
  );
};

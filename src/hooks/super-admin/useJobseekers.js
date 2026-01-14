import { getJobseekersList } from "../../api/super-admin/user";
import { useBaseListQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

const useJobseekers = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.jobseekers, getJobseekersList, params);
};

export default useJobseekers;

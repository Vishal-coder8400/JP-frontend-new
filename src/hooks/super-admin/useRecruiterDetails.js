import { getRecruiterById } from "../../api/super-admin/database";
import { useBaseDetailsQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useRecruiterDetails = (recruiterId, options = {}) => {
  return useBaseDetailsQuery(
    QUERY_KEYS.recruiterDetails,
    getRecruiterById,
    recruiterId,
    options
  );
};

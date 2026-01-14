import { getAllRecruiters } from "../../api/super-admin/database";
import { useBaseListQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useRecruiters = (
  filters = {},
  page = 1,
  limit = 10,
  options = {}
) => {
  const params = { page, limit, ...filters };

  return useBaseListQuery(
    QUERY_KEYS.database.recruiters,
    getAllRecruiters,
    params,
    options
  );
};

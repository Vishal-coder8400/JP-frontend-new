import { useQuery } from "@tanstack/react-query";
import { getAllRecruiters } from "../../api/super-admin/database";

export const useRecruiters = (filters = {}, page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  const params = { page, limit, ...filters };

  return useQuery({
    queryKey: ["database-recruiters", token, params],
    queryFn: ({ signal }) => getAllRecruiters({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { getJobseekersList } from "../../api/super-admin/user";

const useJobseekers = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-jobseekers", token, params],
    queryFn: ({ signal }) => getJobseekersList({ signal, ...params }),
    enabled: !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useJobseekers;

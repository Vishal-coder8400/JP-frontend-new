import { useQuery } from "@tanstack/react-query";
import { getAllJobs, getJobById } from "../../api/super-admin/jobsAndTrainings";

export const useGetAllJobs = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-jobs", params],
    queryFn: ({ signal }) => getAllJobs({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetJobDetails = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-job", id],
    queryFn: ({ signal }) => getJobById({ signal, id }),
    enabled: enabled && !!id,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getFilteredJobs } from "../../api/recruiter/job";

export const useFilteredJobs = (filters) => {
  return useQuery({
    queryKey: ["filteredJobs", filters],
    queryFn: getFilteredJobs,
    keepPreviousData: true, // helpful for pagination
    enabled: !!filters, // ensure filters is not null
  });
};

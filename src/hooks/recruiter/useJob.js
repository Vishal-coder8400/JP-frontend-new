import { useQuery } from "@tanstack/react-query";
import { getFilteredJobs } from "../../api/recruiter/job";
import { omit } from "../../utils/commonFunctions";

export const useFilteredJobs = (filters) => {
  // Sanitize filters before sending to API
  const sanitizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["filteredJobs", sanitizedFilters],
    queryFn: getFilteredJobs,
    keepPreviousData: true, // helpful for pagination
    enabled: filters?.jobType === "job",
  });
};

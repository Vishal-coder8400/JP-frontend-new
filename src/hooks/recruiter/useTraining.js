import { useQuery } from "@tanstack/react-query";
import { getFilteredTrainings } from "../../api/recruiter/training";
import { omit } from "../../utils/commonFunctions";

export const useFilteredTrainings = (filters) => {
  const sanitizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["filteredTrainings", sanitizedFilters],
    queryFn: getFilteredTrainings,
    keepPreviousData: true, // helpful for pagination
    enabled: !!sanitizedFilters, // ensure filters is not null
  });
};

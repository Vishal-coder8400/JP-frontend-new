import { useQuery } from "@tanstack/react-query";
import {
  getFilteredTrainings,
  getTrainningById,
} from "../../api/recruiter/training";
import { omit } from "../../utils/commonFunctions";

export const useFilteredTrainings = (filters) => {
  const sanitizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["filteredTrainings", sanitizedFilters],
    queryFn: getFilteredTrainings,
    keepPreviousData: true, // helpful for pagination
    enabled: filters?.jobType === "training",
  });
};
export const useGetTrainningById = (id, jobType) => {
  return useQuery({
    queryKey: ["trainning-by-id", id],
    queryFn: () => getTrainningById(id),
    retry: false,
    enabled: jobType === "training",
  });
};

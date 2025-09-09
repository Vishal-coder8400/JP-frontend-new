import { useQuery } from "@tanstack/react-query";
import { omit } from "../../utils/commonFunctions";
import { getTrainingList } from "../../api/corporate/training";

export const useTraining = (filters) => {
  const sanotizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["trainingList", sanotizedFilters],
    queryFn: getTrainingList,
    keepPreviousData: true, // helpful for pagination
    enabled: filters?.jobType === "training",
  });
};

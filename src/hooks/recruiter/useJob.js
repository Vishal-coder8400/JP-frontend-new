import { useMutation, useQuery } from "@tanstack/react-query";
import {
  applyBulkSeeker,
  applySingleSeeker,
  getFilteredJobs,
  getJobById,
} from "../../api/recruiter/job";
import { omit } from "../../utils/commonFunctions";
import { toast } from "sonner";

export const useFilteredJobs = (filters) => {
  // Sanitize filters before sending to API
  const sanitizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["filteredJobs", sanitizedFilters],
    queryFn: getFilteredJobs,
    keepPreviousData: true, // helpful for pagination
  });
};
export const useGetJobById = (id, jobType) => {
  return useQuery({
    queryKey: ["job-by-id", id],
    queryFn: () => getJobById(id),
    retry: false,
    enabled: jobType === "job",
  });
};
export const useApplySingle = () => {
  return useMutation({
    mutationFn: applySingleSeeker,
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};
export const useBulkApplySingle = () => {
  return useMutation({
    mutationFn: applyBulkSeeker,
    onSuccess: (data) => {
      if (data.data.failed > 0) {
        toast.error(data.data.message);
      } else {
        toast.success(data.data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};

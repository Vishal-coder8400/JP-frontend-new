import { useMutation, useQuery } from "@tanstack/react-query";
import { corporateJobPost, getFilteredJobs } from "../../api/corporate/job";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "../../stores/useAuthStore";
import { omit } from "../../utils/commonFunctions";

export const useFilteredJobs = (filters) => {
  const sanitizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["filteredJobs", sanitizedFilters],
    queryFn: getFilteredJobs,
    keepPreviousData: true, // helpful for pagination
    enabled: filters.jobType === "job", // ensure filters is not null
  });
};
export const useCorporateJobPost = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: corporateJobPost,
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate(`/${user?.role}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

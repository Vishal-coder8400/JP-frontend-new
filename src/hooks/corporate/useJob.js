import { useMutation, useQuery } from "@tanstack/react-query";
import {
  corporateJobById,
  corporateJobPost,
  getCandidatesByJobId,
  getFilteredJobs,
} from "../../api/corporate/job";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "../../stores/useAuthStore";
import { omit } from "../../utils/commonFunctions";
import { useApproval } from "../common/useApproval";

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
  const { mutate: approve } = useApproval();
  return useMutation({
    mutationFn: corporateJobPost,
    onSuccess: (data) => {
      toast.success(data.data.message);
      approve({
        type: "job",
        applicantId: data.data.data._id,
        applicantType: "job",
      });
      navigate(`/${user?.role}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useCorporateJobById = (id, jobType) => {
  return useQuery({
    queryKey: ["corporateJobById", id],
    queryFn: () => corporateJobById(id),
    enabled: jobType === "job",
    retry: false,
  });
};

export const useGetCandidatesByJobId = (id, filters) => {
  return useQuery({
    queryKey: ["candidatesByJobId", id, filters],
    queryFn: getCandidatesByJobId,
    enabled: !!id,
    retry: false,
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobs,
  getJobById,
  updateJob,
} from "../../api/super-admin/jobsAndTrainings";
import { toast } from "sonner";

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

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateJob({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Job updated successfully!");

      // Invalidate and refetch job details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-job", variables.id],
      });

      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-jobs"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
};

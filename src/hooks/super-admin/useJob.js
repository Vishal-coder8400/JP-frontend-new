import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobs,
  getJobById,
  updateJob,
} from "../../api/super-admin/jobsAndTrainings";
import { toast } from "sonner";

export const useGetAllJobs = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-jobs", token, params],
    queryFn: ({ signal }) => getAllJobs({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetJobDetails = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-job", token, id],
    queryFn: ({ signal }) => getJobById({ signal, id }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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

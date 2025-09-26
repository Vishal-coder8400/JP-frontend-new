import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobApplications,
  getJobsApplications,
  getJobDetails,
} from "../../api/super-admin/job";
import { toast } from "sonner";

export const useGetAllJobs = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-jobs", params],
    queryFn: ({ signal }) => getAllJobs({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetJobById = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-job", id],
    queryFn: ({ signal }) => getJobById({ signal, id }),
    enabled: enabled && !!id,
  });
};

export const useGetJobApplications = (
  jobId,
  params = {},
  { enabled = true } = {}
) => {
  return useQuery({
    queryKey: ["superAdmin-job-applications", jobId, params],
    queryFn: ({ signal }) => getJobApplications({ signal, jobId, ...params }),
    enabled: enabled && !!jobId,
    keepPreviousData: true,
  });
};

export const useGetJobsApplications = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-jobs-applications", params],
    queryFn: ({ signal }) => getJobsApplications({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetJobDetails = (jobId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-job-details", jobId],
    queryFn: ({ signal }) => getJobDetails({ signal, jobId }),
    enabled: enabled && !!jobId,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      toast.success("Job created successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-jobs"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create job");
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJob,
    onSuccess: (data, variables) => {
      toast.success("Job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-jobs"] });
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-job", variables.id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-jobs"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete job");
    },
  });
};

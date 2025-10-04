import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
} from "../../api/super-admin/applicant";
import { getCandidateDetails } from "../../api/super-admin/user";
import { toast } from "sonner";

export const useGetAllApplicants = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-applicants", token, params],
    queryFn: ({ signal }) => getAllApplicants({ signal, ...params }),
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

export const useGetApplicantById = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-applicant", token, id],
    queryFn: ({ signal }) => getApplicantById({ signal, id }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useCreateApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplicant,
    onSuccess: (data) => {
      toast.success("Applicant created successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-applicants"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create applicant"
      );
    },
  });
};

export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplicant,
    onSuccess: (data, variables) => {
      toast.success("Applicant updated successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-applicants"] });
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-applicant", variables.id],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update applicant"
      );
    },
  });
};

export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplicant,
    onSuccess: () => {
      toast.success("Applicant deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-applicants"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete applicant"
      );
    },
  });
};

export const useGetCandidateDetails = (
  jobseekerId,
  { enabled = true } = {}
) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-candidate-details", token, jobseekerId],
    queryFn: ({ signal }) => getCandidateDetails(jobseekerId, { signal }),
    enabled: enabled && !!jobseekerId && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

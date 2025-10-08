import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApprovalsList,
  getApprovalDetails,
  reviewApproval,
} from "../../api/super-admin/approvals";

export const useGetApprovalsCompanies = (params = {}) => {
  const token = localStorage.getItem("token");
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ["approvals-companies", token, queryParams],
    queryFn: ({ signal }) =>
      getApprovalsList("corporate", { signal, ...queryParams }),
    enabled: enabled && !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetApprovalsTrainers = (params = {}) => {
  const token = localStorage.getItem("token");
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ["approvals-trainers", token, queryParams],
    queryFn: ({ signal }) =>
      getApprovalsList("trainer", { signal, ...queryParams }),
    enabled: enabled && !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetApprovalsRecruiters = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["approvals-recruiters", token, params],
    queryFn: ({ signal }) =>
      getApprovalsList("recruiter", { signal, ...params }),
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

export const useGetApprovalsJobs = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["approvals-jobs", token, params],
    queryFn: ({ signal }) => getApprovalsList("job", { signal, ...params }),
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

export const useGetApprovalsTrainings = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["approvals-trainings", token, params],
    queryFn: ({ signal }) =>
      getApprovalsList("training", { signal, ...params }),
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

export const useGetApprovalsJobsAndTrainings = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["approvals-jobs-trainings", token, params],
    queryFn: ({ signal }) =>
      getApprovalsList("job-training", { signal, ...params }),
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

export const useGetApprovalDetails = (approvalId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["approval-details", approvalId],
    queryFn: ({ signal }) => getApprovalDetails(approvalId, { signal }),
    enabled: enabled && !!approvalId,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook for approval actions (approve, reject, hold)
export const useApprovals = () => {
  const queryClient = useQueryClient();

  const reviewApprovalMutation = useMutation({
    mutationFn: ({ approvalId, status, reviewerNotes }) =>
      reviewApproval(approvalId, { status, reviewerNotes }),
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["approvals-"] });
      queryClient.invalidateQueries({ queryKey: ["approval-details"] });
    },
  });

  const approveApplication = async (approvalId) => {
    return reviewApprovalMutation.mutateAsync({
      approvalId,
      status: "approved",
    });
  };

  const rejectApplication = async (approvalId, reviewerNotes = "") => {
    return reviewApprovalMutation.mutateAsync({
      approvalId,
      status: "rejected",
      reviewerNotes,
    });
  };

  const holdApplication = async (approvalId, reviewerNotes = "") => {
    return reviewApprovalMutation.mutateAsync({
      approvalId,
      status: "hold",
      reviewerNotes,
    });
  };

  return {
    isLoading: reviewApprovalMutation.isPending,
    approveApplication,
    rejectApplication,
    holdApplication,
    error: reviewApprovalMutation.error,
  };
};

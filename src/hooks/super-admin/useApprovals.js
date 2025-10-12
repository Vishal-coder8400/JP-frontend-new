import {
  getApprovalsList,
  getApprovalDetails,
  reviewApproval,
} from "../../api/super-admin/approvals";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useBaseMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

const createApprovalsListQuery = (type, params = {}) => {
  const { enabled = true, ...queryParams } = params;

  return useBaseListQuery(
    (token) => QUERY_KEYS.approvals[type](token, queryParams),
    ({ signal }) => getApprovalsList(type, { signal, ...queryParams }),
    queryParams,
    { enabled }
  );
};

export const useGetApprovalsCompanies = (params = {}) => {
  return createApprovalsListQuery("corporate", params);
};

export const useGetApprovalsTrainers = (params = {}) => {
  return createApprovalsListQuery("trainer", params);
};

export const useGetApprovalsRecruiters = (params = {}) => {
  return createApprovalsListQuery("recruiter", params);
};

export const useGetApprovalsCandidates = (params = {}) => {
  return createApprovalsListQuery("candidates", params);
};

export const useGetApprovalsJobs = (params = {}) => {
  return createApprovalsListQuery("job", params);
};

export const useGetApprovalsTrainings = (params = {}) => {
  return createApprovalsListQuery("training", params);
};

export const useGetApprovalsJobsAndTrainings = (params = {}) => {
  return createApprovalsListQuery("jobsAndTrainings", params);
};

export const useGetApprovalDetails = (approvalId, options = {}) => {
  return useBaseDetailsQuery(
    QUERY_KEYS.approvals.details,
    getApprovalDetails,
    approvalId,
    options
  );
};

export const useApprovals = () => {
  const reviewApprovalMutation = useBaseMutation(
    ({ approvalId, status, reviewerNotes }) =>
      reviewApproval(approvalId, { status, reviewerNotes }),
    {
      invalidateKeys: [{ prefix: "approvals-" }, ["approval-details"]],
    }
  );

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

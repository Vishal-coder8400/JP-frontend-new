import { useState } from "react";
import { toast } from "sonner";
import {
  submitCorporateApproval,
  submitJobSeekerApproval,
  submitRecruiterApproval,
  submitTrainerApproval,
  reviewApproval,
} from "../../api/super-admin/approvals";

export const useApprovals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = async (apiCall, successMessage, errorMessage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      toast.success(successMessage);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || errorMessage;
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitCorporateApprovalAction = async (corporateId) => {
    return handleApiCall(
      () => submitCorporateApproval(corporateId),
      "Corporate approval submitted successfully",
      "Failed to submit corporate approval"
    );
  };

  const submitJobSeekerApprovalAction = async (jobSeekerId) => {
    return handleApiCall(
      () => submitJobSeekerApproval(jobSeekerId),
      "Job seeker approval submitted successfully",
      "Failed to submit job seeker approval"
    );
  };

  const submitRecruiterApprovalAction = async (recruiterId) => {
    return handleApiCall(
      () => submitRecruiterApproval(recruiterId),
      "Recruiter approval submitted successfully",
      "Failed to submit recruiter approval"
    );
  };

  const submitTrainerApprovalAction = async (trainerId) => {
    return handleApiCall(
      () => submitTrainerApproval(trainerId),
      "Trainer approval submitted successfully",
      "Failed to submit trainer approval"
    );
  };

  // Review approval functions
  const approveApplication = async (approvalId) => {
    return handleApiCall(
      () =>
        reviewApproval(approvalId, {
          status: "approved",
        }),
      "Application approved successfully",
      "Failed to approve application"
    );
  };

  const rejectApplication = async (approvalId) => {
    return handleApiCall(
      () =>
        reviewApproval(approvalId, {
          status: "rejected",
        }),
      "Application rejected successfully",
      "Failed to reject application"
    );
  };

  const holdApplication = async (approvalId) => {
    return handleApiCall(
      () =>
        reviewApproval(approvalId, {
          status: "pending",
        }),
      "Application held for review successfully",
      "Failed to hold application"
    );
  };

  return {
    isLoading,
    error,
    submitCorporateApprovalAction,
    submitJobSeekerApprovalAction,
    submitRecruiterApprovalAction,
    submitTrainerApprovalAction,
    approveApplication,
    rejectApplication,
    holdApplication,
  };
};

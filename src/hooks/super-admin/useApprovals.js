import { useState } from "react";
import { toast } from "sonner";
import {
  reviewApproval,
  getApprovalDetails,
} from "../../api/super-admin/approvals";
import { useQuery } from "@tanstack/react-query";

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

  const rejectApplication = async (approvalId, rejectionReason = "") => {
    return handleApiCall(
      () =>
        reviewApproval(approvalId, {
          status: "rejected",
          rejectionReason: rejectionReason,
        }),
      "Application rejected successfully",
      "Failed to reject application"
    );
  };

  const holdApplication = async (approvalId) => {
    return handleApiCall(
      () =>
        reviewApproval(approvalId, {
          status: "hold",
        }),
      "Application put on hold successfully",
      "Failed to hold application"
    );
  };

  return {
    isLoading,
    error,
    approveApplication,
    rejectApplication,
    holdApplication,
  };
};

// Hook to get approval details by ID (unified for all types)
export const useGetApprovalDetails = (approvalId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-approval-details", approvalId],
    queryFn: ({ signal }) => getApprovalDetails(approvalId, { signal }),
    enabled: enabled && !!approvalId,
  });
};

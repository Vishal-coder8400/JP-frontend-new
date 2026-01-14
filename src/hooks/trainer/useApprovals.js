import { useState } from "react";
import { toast } from "sonner";
import { submitTrainerApproval } from "../../api/super-admin/approvals";
import useAuthStore from "../../stores/useAuthStore";

export const useTrainerApprovals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token, isAuthenticated } = useAuthStore();

  const submitForApproval = async () => {
    // Check if user is authenticated and has a token
    if (!isAuthenticated || !token) {
      toast.error("Please log in to submit for approval");
      return;
    }

    if (!user?.id) {
      toast.error(
        "User information not available. Please refresh and try again."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await submitTrainerApproval(user.id);
      toast.success("Your trainer profile has been submitted for approval");
      return response.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit for approval";
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    submitForApproval,
  };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStatus } from "../../api/super-admin/jobsAndTrainings";

export const useApplicationApprovals = () => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ applicationId, data }) =>
      updateApplicationStatus(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["training-applications"] });
    },
  });

  const handleApprove = async (applicationId, notes = "", feedback = "") => {
    return updateStatusMutation.mutateAsync({
      applicationId,
      data: {
        status: "approved",
        stage: "admin_review",
        notes,
        feedback,
      },
    });
  };

  const handleReject = async (applicationId, notes = "", feedback = "") => {
    return updateStatusMutation.mutateAsync({
      applicationId,
      data: {
        status: "rejected",
        stage: "admin_review",
        notes,
        feedback,
      },
    });
  };

  const handleHold = async (applicationId, notes = "", feedback = "") => {
    return updateStatusMutation.mutateAsync({
      applicationId,
      data: {
        status: "hold",
        stage: "admin_review",
        notes,
        feedback,
      },
    });
  };

  const handleShortlist = async (applicationId, notes = "", feedback = "") => {
    return updateStatusMutation.mutateAsync({
      applicationId,
      data: {
        status: "shortlisted",
        stage: "admin_review",
        notes,
        feedback,
      },
    });
  };

  const handleScheduleInterview = async (
    applicationId,
    notes = "",
    feedback = ""
  ) => {
    return updateStatusMutation.mutateAsync({
      applicationId,
      data: {
        status: "interview_scheduled",
        stage: "admin_review",
        notes,
        feedback,
      },
    });
  };

  return {
    isLoading: updateStatusMutation.isPending,
    handleApprove,
    handleReject,
    handleHold,
    handleShortlist,
    handleScheduleInterview,
    error: updateStatusMutation.error,
  };
};

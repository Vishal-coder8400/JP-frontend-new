import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateJobApplicationStatus,
  updateTrainingApplicationStatus,
} from "../../api/super-admin/jobsAndTrainings";

export const useApplicationApprovals = (applicationType = "job") => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ applicationId, data }) => {
      const updateFn =
        applicationType === "training"
          ? updateTrainingApplicationStatus
          : updateJobApplicationStatus;
      return updateFn(applicationId, data);
    },
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

import {
  getApprovalsList,
  getApprovalDetails,
  reviewApproval,
} from "../../api/super-admin/approvals";
import { createNotification } from "../../api/super-admin/notifications";
import useAuthStore from "../../stores/useAuthStore";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useBaseMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";
import { nanoid } from "nanoid";

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
  console.log("useGetApprovalsRecruiters called", { params });
  return createApprovalsListQuery("recruiter", params);
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

const createNotificationForApproval = async (approvalData, user) => {
  console.log("=== createNotificationForApproval called ===");
  console.log("approvalData:", JSON.stringify(approvalData, null, 2));
  console.log("user:", user);

  // Try different possible structures
  const approval =
    approvalData?.data?.approval ||
    approvalData?.data?.data?.approval ||
    approvalData?.approval ||
    approvalData?.data ||
    approvalData;

  console.log("Extracted approval:", JSON.stringify(approval, null, 2));

  if (!approval) {
    console.log("Early return: no approval data found");
    return;
  }

  let entityType = approval?.entityType;
  let entityData = approval?.data;

  // If we don't have entityType, infer from the data structure
  if (!entityType && entityData) {
    // Check if this is already the entity data (no approval wrapper)
    if (entityData.title || entityData.sessionFrequency) {
      entityType = "training";
      // entityData is already set
    } else if (entityData.jobTitle || entityData.jobType) {
      entityType = "job";
      // entityData is already set
    }
  }

  // If entityData is the approval object itself (no wrapper)
  if (!entityData && approval) {
    // Check if approval has fields that indicate it's the entity data
    if (approval.title || approval.sessionFrequency) {
      entityType = "training";
      entityData = approval;
    } else if (approval.jobTitle || approval.jobType) {
      entityType = "job";
      entityData = approval;
    }
  }

  console.log("entityType:", entityType);
  console.log("entityData:", JSON.stringify(entityData, null, 2));

  if (entityType !== "job" && entityType !== "training") {
    console.log("Early return: not a job or training", { entityType });
    return;
  }

  const isJob = entityType === "job";
  const entityTitle = isJob
    ? entityData?.jobTitle || entityData?.title
    : entityData?.title;

  const postedBy = entityData?.postedBy;
  const createdBy = entityData?.createdBy;
  const recipientId = postedBy?._id || createdBy?._id || postedBy || createdBy;

  const notificationData = {
    messageId: nanoid(21),
    messageContent: isJob
      ? `Your job posting "${entityTitle}" has been approved and is now live.`
      : `Your training "${entityTitle}" has been approved and is now live.`,
    senderId: user?._id || "system",
    senderType: "super-admin",
    notificationType: "approval",
    category: "success",
    priority: "medium",
    metadata: {
      entityType,
      entityId: entityData?._id,
      approvalId: approval._id,
      recipientId,
      companyId: postedBy?.companyId,
      trainerId: entityData?.trainer?._id || entityData?.trainer,
    },
  };

  try {
    await createNotification(notificationData);
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
};

export const useApprovals = () => {
  const user = useAuthStore((state) => state.user);
  const reviewApprovalMutation = useBaseMutation(
    ({ approvalId, status, reviewerNotes }) => {
      console.log("reviewApproval called", { approvalId });
      return reviewApproval(approvalId, { status, reviewerNotes });
    },
    {
      invalidateKeys: [{ prefix: "approvals-" }, ["approval-details"]],
    }
  );

  const approveApplication = async (approvalId) => {
    console.log("approveApplication called", { approvalId });

    let approvalDetailsBeforeReview = null;
    try {
      console.log("Fetching approval details before review for:", approvalId);
      approvalDetailsBeforeReview = await getApprovalDetails({ id: approvalId });
      console.log(
        "Approval details before review:",
        approvalDetailsBeforeReview
      );
    } catch (error) {
      console.error("Failed to fetch approval details before review:", error);
    }

    const result = await reviewApprovalMutation.mutateAsync({
      approvalId,
      status: "approved",
    });

    console.log("Approval result:", result);

    console.log(
      "Creating notification for approval:",
      approvalDetailsBeforeReview,
      user
    );
    await createNotificationForApproval(approvalDetailsBeforeReview, user);

    return result;
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

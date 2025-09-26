import api from "../../lib/axios";

/**
 * Approval API Integration
 *
 * This module provides API functions for submitting approvals for all user types.
 * These functions are used by SUPER ADMINS to submit users for approval.
 *
 * Usage:
 * - Super admins can submit any user type for approval using the convenience functions
 * - The API follows the pattern: POST /api/v1/approvals/submit with type: "userType"
 * - This endpoint is PUBLIC and accessible to everyone
 * - Corporate approval = Super admin approving a company
 * - Recruiter approval = Super admin approving a recruiter
 * - JobSeeker approval = Super admin approving a job seeker
 * - Trainer approval = Super admin approving a trainer
 */

// Submit approval for any user type
export const submitApproval = (data) =>
  api.post("/api/v1/approvals/submit", data);

// Review approval (approve, reject, hold)
export const reviewApproval = (approvalId, data) =>
  api.patch(`/api/v1/admin/approvals/${approvalId}/review`, data);

// Convenience functions for each user type

// Convenience functions for each user type
export const submitCorporateApproval = (corporateId) =>
  submitApproval({
    type: "corporate",
    applicantId: corporateId,
    applicantType: "corporate",
  });

export const submitJobSeekerApproval = (jobSeekerId) =>
  submitApproval({
    type: "jobseeker",
    applicantId: jobSeekerId,
    applicantType: "jobseeker",
  });

export const submitRecruiterApproval = (recruiterId) =>
  submitApproval({
    type: "recruiter",
    applicantId: recruiterId,
    applicantType: "recruiter",
  });

export const submitTrainerApproval = (trainerId) =>
  submitApproval({
    type: "trainer",
    applicantId: trainerId,
    applicantType: "trainer",
  });

// Get approvals list by type
export const getApprovalsList = (type, params = {}) =>
  api.get(`/api/v1/admin/approvals/list`);

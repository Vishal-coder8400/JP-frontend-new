import api from "../../lib/axios";

export const reviewApproval = (approvalId, data) =>
  api.patch(`/admin/approvals/${approvalId}/review`, data);

export const getApprovalsList = (type, params = {}) =>
  api.get(`/admin/approvals/list`, { params: { type, ...params } });

export const getApprovalDetails = (approvalId) =>
  api.get(`/admin/approvals/${approvalId}`);

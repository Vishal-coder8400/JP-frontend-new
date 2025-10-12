import api from "../../lib/axios";

export const reviewApproval = async (approvalId, data) => {
  const response = await api.patch(
    `/admin/approvals/${approvalId}/review`,
    data
  );
  return response.data;
};

export const getApprovalsList = async (type, { signal, ...params } = {}) => {
  const response = await api.get(`/admin/approvals/list`, {
    signal,
    params: { type, ...params },
  });
  return response.data;
};

export const getApprovalDetails = async (approvalId, { signal } = {}) => {
  const response = await api.get(`/admin/approvals/${approvalId}`, { signal });
  return response.data;
};

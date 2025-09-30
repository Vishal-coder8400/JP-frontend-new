import api from "../../lib/axios";

export const getFilteredJobs = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/corporate/job?${params}`);
  return response.data;
};
export const corporateJobPost = (data) => api.post("/corporate/job", data);

export const corporateJobById = async (id) => {
  const result = await api.get(`/corporate/job/${id}`);
  return result.data;
};

export const getCandidatesByJobId = async ({ queryKey }) => {
  const [, id, filters] = queryKey;
  // ✅ extract
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/corporate/applications/jobs/${id}?${params}`);
  return res.data;
};

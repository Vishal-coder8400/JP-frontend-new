import api from "../../lib/axios";

export const getFilteredJobs = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/recruiter/job?${params}`);
  return response.data;
};

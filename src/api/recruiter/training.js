import api from "../../lib/axios";

export const getFilteredTrainings = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/api/v1/recruiter/training?${params}`);
  return response.data;
};

import api from "../../lib/axios";

export const getFilteredTrainings = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/recruiter/training?${params}`);
  return response.data;
};
export const getTrainningById = async (id) => {
  const result = await api.get(`/recruiter/training/${id}`);
  return result.data;
};

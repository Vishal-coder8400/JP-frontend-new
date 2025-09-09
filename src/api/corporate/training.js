import api from "../../lib/axios";

export const getTrainingList = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/api/v1/corporate/training?${params}`);
  return response.data;
};

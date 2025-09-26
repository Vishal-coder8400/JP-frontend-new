import api from "../../lib/axios";

export const getTrainingList = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/corporate/training?${params}`);
  return response.data;
};

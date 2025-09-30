import api from "../../lib/axios";

export const getTrainingList = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/corporate/training?${params}`);
  return response.data;
};
export const corporateTrainingPost = (data) =>
  api.post("/corporate/training", data);

export const corporateTrainingById = async (id) => {
  const result = await api.get(`/corporate/training/${id}`);
  return result.data;
};

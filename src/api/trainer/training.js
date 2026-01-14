import api from "@/lib/axios";

export const getAllTrainings = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/trainer/trainings?${params}`);
  return response.data;
};

export const getTrainingbtId = async ({ id }) => {
  const response = await api.get(`/trainer/trainings/${id}`);
  return response.data;
};

export const applyForTraining = async (data) => {
  const response = await api.post(`/applications/trainings/apply`, data);
  return response.data;
};

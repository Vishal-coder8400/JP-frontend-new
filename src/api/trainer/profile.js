import api from "../../lib/axios";

export const getTrainerProfile = async () => {
  const result = await api.get("/trainer/profile/profile");
  return result.data;
};
export const getTrainerProgress = async () => {
  const result = await api.get("/trainer/progress");
  return result.data;
};

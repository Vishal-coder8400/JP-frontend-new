import api from "../../lib/axios";

export const trainerRegistrationStage1 = async (data) => {
  const result = await api.post("/trainer/signup/stage1", data);
  return result.data;
};
export const trainerRegistrationStage2 = async (data) => {
  const result = await api.post("/trainer/signup/stage2", data);
  return result.data;
};
export const trainerRegistrationStage3 = async (data) => {
  const result = await api.post("/trainer/signup/stage3", data);
  return result.data;
};
export const trainerRegistrationStage4 = async (data) => {
  const result = await api.post("/trainer/signup/stage4", data);
  return result.data;
};
export const trainerLogin = async (data) => {
  const result = await api.post("/trainer/login", data);
  return result.data;
};


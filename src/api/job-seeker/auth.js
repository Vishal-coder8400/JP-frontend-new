import api from "../../lib/axios";

export const login = (credentials) => api.post("/jobseeker/login", credentials);

export const signUpStage1 = (data) =>
  api.post("/jobseeker/signup/stage1", data);
export const signUpStage2 = (data) =>
  api.post("/jobseeker/signup/stage2", data);
export const signUpStage3 = (data) =>
  api.post("/jobseeker/signup/stage3", data);
export const signUpStage4 = (data) =>
  api.post("/jobseeker/signup/stage4", data);
export const signUpStage5 = (data) =>
  api.post("/jobseeker/signup/stage5", data);

import api from "../../lib/axios";

export const login = (credentials) => api.post("/corporate/login", credentials);
export const register = (data) => api.post("/corporate/signup/stage1", data);
export const signupStage2 = (data) =>
  api.post("/corporate/signup/stage2", data);

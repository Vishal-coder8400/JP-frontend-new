import api from "../../lib/axios";

export const login = (credentials) => api.post("/recruiter/login", credentials);

export const register = (data) => api.post("/recruiter/register", data);
export const kycDetails = (data) =>
  api.post("/recruiter/profile/add-kyc-info", data);
export const sectoralDetails = (data) =>
  api.post("/recruiter/profile/add-professional-info", data);

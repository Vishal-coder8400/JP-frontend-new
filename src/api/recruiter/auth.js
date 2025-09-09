import api from "../../lib/axios";

export const login = (credentials) =>
  api.post("/api/v1/recruiter/login", credentials);

export const register = (data) => api.post("/api/v1/recruiter/register", data);
export const kycDetails = (data) =>
  api.post("/api/v1/recruiter/profile/add-kyc-info", data);
export const sectoralDetails = (data) =>
  api.post("/api/v1/recruiter/profile/add-professional-info", data);

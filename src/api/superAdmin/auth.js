import api from "../../lib/axios";

export const login = (credentials) =>
  api.post("/api/v1/superAdmin/login", credentials);

export const register = (data) => api.post("/api/v1/superAdmin/register", data);

export const kycDetails = (data) =>
  api.post("/api/v1/superAdmin/profile/add-kyc-info", data);

export const sectoralDetails = (data) =>
  api.post("/api/v1/superAdmin/profile/add-professional-info", data);

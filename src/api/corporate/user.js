import api from "../../lib/axios";

export const getCorporateUserDetails = async ({ signal }) => {
  const response = await api.get("/corporate/profile", { signal });
  return response.data;
};
export const getCorporateProgressDetails = async ({ signal }) => {
  const response = await api.get("/corporate/multistage/progress", { signal });
  return response.data;
};
export const updateCorporateUserDetails = async (data) => {
  const response = await api.put("/corporate/profile/profile", data);
  return response.data;
};

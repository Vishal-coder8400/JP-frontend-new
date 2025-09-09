import api from "../../lib/axios";

export const getCorporateUserDetails = async ({ signal }) => {
  const response = await api.get("/api/v1/corporate/profile", { signal });
  return response.data;
};

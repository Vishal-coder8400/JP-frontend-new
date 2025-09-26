import api from "../../lib/axios";

export const getCorporateUserDetails = async ({ signal }) => {
  const response = await api.get("/corporate/profile", { signal });
  return response.data;
};

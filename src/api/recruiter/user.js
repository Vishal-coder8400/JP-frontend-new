import api from "../../lib/axios";

export const getUserDetails = async ({ signal }) => {
  const response = await api.get("/recruiter/profile", { signal });
  return response.data;
};

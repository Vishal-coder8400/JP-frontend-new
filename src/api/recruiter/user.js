import api from "../../lib/axios";

export const getUserDetails = async ({ signal }) => {
  const response = await api.get("/api/v1/recruiter/profile", { signal });
  return response.data;
};

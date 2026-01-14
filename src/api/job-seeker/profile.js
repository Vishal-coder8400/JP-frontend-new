import api from "../../lib/axios";

export const getJobSeekerProfile = async ({ signal }) => {
  const response = await api.get("/jobseeker/profile/profile", { signal });
  return response.data;
};
export const jobSeekerProfileProgress = async ({ signal }) => {
  const response = await api.get("/jobseeker/progress", { signal });
  return response.data;
};

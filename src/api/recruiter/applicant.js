import api from "../../lib/axios";

export const getAllApplicantDetails = async ({ signal }) => {
  const response = await api.get("/recruiter/jobseeker", { signal });
  return response.data;
};
export const createJobSeeker = (data) => api.post("/recruiter/jobseeker", data);
export const updateJobSeeker = ({ id, data }) =>
  api.put(`/recruiter/jobseeker/${id}`, data);

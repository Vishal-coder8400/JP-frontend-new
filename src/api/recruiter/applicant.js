import api from "../../lib/axios";

export const getAllApplicantDetails = async ({ signal }) => {
  const response = await api.get("/api/v1/recruiter/jobseeker", { signal });
  return response.data;
};
export const createJobSeeker = (data) =>
  api.post("/api/v1/recruiter/jobseeker", data);
export const updateJobSeeker = ({ id, data }) =>
  api.put(`/api/v1/recruiter/jobseeker/${id}`, data);

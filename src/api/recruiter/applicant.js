import api from "../../lib/axios";

export const getAllApplicantDetails = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(
    `/recruiter/jobseeker/my-candidates?${params}`
  );
  return response.data;
};
export const createJobSeeker = (data) => api.post("/recruiter/jobseeker", data);
export const updateJobSeeker = ({ id, data }) =>
  api.put(`/recruiter/jobseeker/${id}`, data);

export const getApplicantsById = async ({ id, signal }) => {
  const response = await api.get(`/recruiter/jobseeker/${id}`, { signal });
  return response.data;
};

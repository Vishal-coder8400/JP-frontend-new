import api from "../../lib/axios";

export const getFilteredJobs = async ({ queryKey }) => {
  const [, filters] = queryKey;
  const params = new URLSearchParams(filters).toString();

  const response = await api.get(`/recruiter/job?${params}`);
  return response.data;
};

export const getJobById = async (id) => {
  const result = await api.get(`/recruiter/job/${id}`);
  return result.data;
};

export const applySingleSeeker = async (data) => {
  const result = await api.post("/applications/jobs/recruiter/apply", data);
  return result.data;
};
export const applyBulkSeeker = async (data) => {
  const result = await api.post(
    "/applications/jobs/recruiter/bulk-apply",
    data
  );
  return result.data;
};

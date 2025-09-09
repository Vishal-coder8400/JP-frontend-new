import api from "../../lib/axios";

export const getAllJobs = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/superAdmin/jobs", {
    signal,
    params: { page, limit, ...params },
  });

export const getJobById = ({ signal, id }) =>
  api.get(`/api/v1/superAdmin/jobs/${id}`, { signal });

export const createJob = (data) => api.post("/api/v1/superAdmin/jobs", data);

export const updateJob = ({ id, data }) =>
  api.put(`/api/v1/superAdmin/jobs/${id}`, data);

export const deleteJob = (id) => api.delete(`/api/v1/superAdmin/jobs/${id}`);

export const getJobApplications = ({ signal, jobId, ...params }) =>
  api.get(`/api/v1/superAdmin/jobs/${jobId}/applications`, {
    signal,
    params,
  });

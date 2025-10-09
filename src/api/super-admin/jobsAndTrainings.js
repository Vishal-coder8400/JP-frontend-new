import api from "../../lib/axios";

export const getAllTrainings = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/trainings/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getTrainingById = ({ signal, id }) =>
  api.get(`/admin/trainings/${id}`, { signal });

export const getAllJobs = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/jobs/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getJobById = ({ signal, id }) =>
  api.get(`/admin/jobs/${id}`, { signal });

export const getJobApplications = ({ signal, id }) =>
  api.get(`/admin/applications/jobs/${id}`, { signal });

export const getTrainingApplications = ({ signal, id }) =>
  api.get(`/admin/applications/trainings/${id}`, { signal });

export const updateJob = ({ id, data }) => api.put(`/admin/jobs/${id}`, data);

export const updateJobStatus = ({ id, status }) =>
  api.patch(`/admin/jobs/${id}/status`, { status });

export const updateTraining = ({ id, data }) =>
  api.put(`/admin/trainings/${id}`, data);

export const updateTrainingStatus = ({ id, status }) =>
  api.patch(`/admin/trainings/${id}/status`, { status });

// Application approval endpoints
export const updateJobApplicationStatus = (applicationId, data) =>
  api.put(`/admin/job-applications/applications/${applicationId}/status`, data);

export const updateTrainingApplicationStatus = (applicationId, data) =>
  api.patch(`/admin/applications/${applicationId}/status`, data);

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

export const updateTraining = ({ id, data }) =>
  api.put(`/admin/trainings/${id}`, data);

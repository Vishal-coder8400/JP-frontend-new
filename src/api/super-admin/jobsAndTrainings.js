import api from "../../lib/axios";

export const getAllTrainings = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/trainings/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getTrainingById = ({ signal, id }) =>
  api.get(`/api/v1/admin/trainings/${id}`, { signal });

export const getAllJobs = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/jobs/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getJobById = ({ signal, id }) =>
  api.get(`/api/v1/admin/jobs/${id}`, { signal });

export const getJobApplications = ({ signal, id }) =>
  api.get(`/api/v1/admin/applications/jobs/${id}`, { signal });

export const getTrainingApplications = ({ signal, id }) =>
  api.get(`/api/v1/admin/applications/trainings/${id}`, { signal });

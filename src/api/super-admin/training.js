import api from "../../lib/axios";

export const getAllTrainings = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/superAdmin/trainings", {
    signal,
    params: { page, limit, ...params },
  });

export const getTrainingById = ({ signal, id }) =>
  api.get(`/api/v1/superAdmin/trainings/${id}`, { signal });

export const createTraining = (data) =>
  api.post("/api/v1/superAdmin/trainings", data);

export const updateTraining = ({ id, data }) =>
  api.put(`/api/v1/superAdmin/trainings/${id}`, data);

export const deleteTraining = (id) =>
  api.delete(`/api/v1/superAdmin/trainings/${id}`);

// Trainers API functions
export const getAllTrainers = () => api.get("/api/v1/admin/trainers/list");

export const getTrainerById = ({ signal, id }) =>
  api.get(`/api/v1/admin/trainers/${id}`, { signal });

export const createTrainer = (data) => api.post("/api/v1/admin/trainers", data);

export const updateTrainer = ({ id, data }) =>
  api.put(`/api/v1/admin/trainers/${id}`, data);

export const deleteTrainer = (id) => api.delete(`/api/v1/admin/trainers/${id}`);

export const getTrainingsApplications = ({ signal, ...params }) =>
  api.get("/api/v1/admin/applications/trainings", {
    signal,
    params,
  });

export const getTrainingDetails = ({ signal, trainingId }) =>
  api.get(`/api/v1/admin/applications/trainings/${trainingId}`, { signal });

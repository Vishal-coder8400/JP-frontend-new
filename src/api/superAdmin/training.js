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

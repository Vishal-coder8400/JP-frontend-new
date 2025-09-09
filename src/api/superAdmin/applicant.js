import api from "../../lib/axios";

export const getAllApplicants = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/superAdmin/applicants", {
    signal,
    params: { page, limit, ...params },
  });

export const getApplicantById = ({ signal, id }) =>
  api.get(`/api/v1/superAdmin/applicants/${id}`, { signal });

export const createApplicant = (data) =>
  api.post("/api/v1/superAdmin/applicants", data);

export const updateApplicant = ({ id, data }) =>
  api.put(`/api/v1/superAdmin/applicants/${id}`, data);

export const deleteApplicant = (id) =>
  api.delete(`/api/v1/superAdmin/applicants/${id}`);

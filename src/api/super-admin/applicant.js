import api from "../../lib/axios";

export const getAllApplicants = async ({ signal, ...params } = {}) => {
  const response = await api.get("/admin/applicants", {
    signal,
    params,
  });
  return response.data;
};

export const getApplicantById = async ({ signal, id } = {}) => {
  const response = await api.get(`/admin/applicants/${id}`, { signal });
  return response.data;
};

export const createApplicant = async (data) => {
  const response = await api.post("/admin/applicants", data);
  return response.data;
};

export const updateApplicant = async ({ id, data }) => {
  const response = await api.put(`/admin/applicants/${id}`, data);
  return response.data;
};

export const deleteApplicant = async (id) => {
  const response = await api.delete(`/admin/applicants/${id}`);
  return response.data;
};

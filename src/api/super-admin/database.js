import api from "../../lib/axios";

export const getAllTrainers = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/trainers/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getTrainerById = ({ signal, id }) =>
  api.get(`/admin/trainers/${id}`, { signal });

export const getAllCompanies = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/corporates", {
    signal,
    params: { page, limit, ...params },
  });

export const getCompanyById = ({ signal, id }) =>
  api.get(`/admin/corporates/${id}`, { signal });

export const getAllRecruiters = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/recruiters", {
    signal,
    params: { page, limit, ...params },
  });

export const getRecruiterById = ({ signal, id }) =>
  api.get(`/admin/recruiters/${id}`, { signal });

export const getAllCandidates = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/candidates/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getCandidateById = ({ signal, id }) =>
  api.get(`/admin/candidates/${id}`, { signal });

export const updateTrainer = ({ id, data }) =>
  api.put(`/admin/trainers/${id}`, data);

import api from "../../lib/axios";

export const getAllTrainers = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/trainers/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getTrainerById = ({ signal, id }) =>
  api.get(`/api/v1/admin/trainers/${id}`, { signal });

export const getAllCompanies = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/corporates", {
    signal,
    params: { page, limit, ...params },
  });

export const getCompanyById = ({ signal, id }) =>
  api.get(`/api/v1/admin/corporates/${id}`, { signal });

export const getAllRecruiters = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/recruiters", {
    signal,
    params: { page, limit, ...params },
  });

export const getRecruiterById = ({ signal, id }) =>
  api.get(`/api/v1/admin/recruiters/${id}`, { signal });

export const getAllCandidates = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/api/v1/admin/candidates/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getCandidateById = ({ signal, id }) =>
  api.get(`/api/v1/admin/candidates/${id}`, { signal });

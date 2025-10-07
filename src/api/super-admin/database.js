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

export const getCompanyById = ({ signal, id, bustCache = false }) =>
  api.get(`/admin/corporates/${id}`, {
    signal,
    ...(bustCache && {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      params: { _t: Date.now() },
    }),
  });

export const getAllRecruiters = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/recruiters", {
    signal,
    params: { page, limit, ...params },
  });

export const getRecruiterById = ({ signal, id }) =>
  api.get(`/admin/recruiters/${id}`, { signal });

export const getAllCandidates = ({ signal, page = 1, limit = 10, ...params }) =>
  api.get("/admin/jobseekers/list", {
    signal,
    params: { page, limit, ...params },
  });

export const getCandidateById = ({ signal, id }) =>
  api.get(`/admin/jobseekers/${id}`, { signal });

// Generic update function for all user types (company, candidate, trainer, recruiter)
export const updateUserProfile = ({ id, data }) =>
  api.put(`/admin/user-profile/${id}/profile`, data);

// Specific update functions for backward compatibility
export const updateTrainer = ({ id, data }) => updateUserProfile({ id, data });

export const updateCompany = ({ id, data }) => updateUserProfile({ id, data });

export const updateCandidate = ({ id, data }) =>
  updateUserProfile({ id, data });

export const updateRecruiter = ({ id, data }) =>
  updateUserProfile({ id, data });

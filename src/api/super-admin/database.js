import { createGetAll, createGetById, createUpdate } from "./baseApi";

export const getAllTrainers = createGetAll("/admin/trainers/list");
export const getTrainerById = createGetById("/admin/trainers");
export const getAllCompanies = createGetAll("/admin/corporates");
export const getCompanyById = createGetById("/admin/corporates");
export const getAllRecruiters = createGetAll("/admin/recruiters");
export const getRecruiterById = createGetById("/admin/recruiters");
export const getAllCandidates = createGetAll("/admin/jobseekers/list");
export const getCandidateById = createGetById("/admin/jobseekers");

export const updateUserProfile = createUpdate("/admin/user-profile");

export const updateTrainer = updateUserProfile;
export const updateCompany = updateUserProfile;
export const updateCandidate = updateUserProfile;
export const updateRecruiter = updateUserProfile;

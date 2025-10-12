import {
  createGetAll,
  createGetById,
  createPost,
  createDelete,
} from "./baseApi";
import { updateUserProfile } from "./database";

export const getAllApplicants = createGetAll("/admin/applicants");
export const getApplicantById = createGetById("/admin/applicants");
export const createApplicant = createPost("/admin/applicants");
export const updateApplicant = updateUserProfile;
export const deleteApplicant = createDelete("/admin/applicants");

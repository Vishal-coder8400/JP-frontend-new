import {
  getAllApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
} from "../../api/super-admin/applicant";
import { getCandidateDetails } from "../../api/super-admin/user";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import {
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllApplicants = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.applicants, getAllApplicants, params);
};

export const useGetApplicantById = (id, options = {}) => {
  return useBaseDetailsQuery(
    QUERY_KEYS.applicant,
    getApplicantById,
    id,
    options
  );
};

export const useCreateApplicant = () => {
  return useCreateMutation(createApplicant, "Applicant", [
    "superAdmin-applicants",
  ]);
};

export const useUpdateApplicant = () => {
  return useUpdateMutation(updateApplicant, "Applicant", [
    "superAdmin-applicants",
    "superAdmin-applicant",
  ]);
};

export const useDeleteApplicant = () => {
  return useDeleteMutation(deleteApplicant, "Applicant", [
    "superAdmin-applicants",
  ]);
};

export const useGetCandidateDetails = (jobseekerId, options = {}) => {
  return useBaseDetailsQuery(
    QUERY_KEYS.candidateDetails,
    getCandidateDetails,
    jobseekerId,
    options
  );
};

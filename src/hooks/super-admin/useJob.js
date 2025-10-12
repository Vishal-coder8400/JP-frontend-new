import {
  getAllJobs,
  getJobById,
  updateJob,
  updateJobStatus,
  getJobsByApplicant,
} from "../../api/super-admin/jobsAndTrainings";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useUpdateMutation, useBaseMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllJobs = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.jobs, getAllJobs, params);
};

export const useGetJobsByApplicant = (applicantId, options = {}) => {
  return useBaseListQuery(
    `${QUERY_KEYS.jobs}-applicant-${applicantId}`,
    getJobsByApplicant,
    { applicantId },
    options
  );
};

export const useGetJobDetails = (id, options = {}) => {
  return useBaseDetailsQuery(QUERY_KEYS.job, getJobById, id, options);
};

export const useUpdateJob = () => {
  return useUpdateMutation(({ id, data }) => updateJob({ id, data }), "Job", [
    "superAdmin-jobs",
    "superAdmin-job",
  ]);
};

export const useUpdateJobStatus = () => {
  return useBaseMutation(({ id, status }) => updateJobStatus({ id, status }), {
    successMessage: "Job status updated successfully!",
    errorMessage: "Failed to update job status",
    invalidateKeys: ["superAdmin-jobs", "superAdmin-job"],
  });
};

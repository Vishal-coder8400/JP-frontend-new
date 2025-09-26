import api from "../../lib/axios";

export const getUserDetails = ({ signal }) =>
  api.get("/api/v1/admin-management/profile", { signal });

export const updateBasicInfo = (data) =>
  api.put("/api/v1/admin-management/profile/basic-info", data);

export const updateQualificationInfo = (data) =>
  api.put("/api/v1/admin-management/profile/qualification-info", data);

export const getJobseekersList = (params = {}) =>
  api.get("/api/v1/admin/jobseekers/list", { params });

export const getCandidateDetails = (jobseekerId) =>
  api.get(`/api/v1/jobseeker/${jobseekerId}`);

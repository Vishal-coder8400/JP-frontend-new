import api from "../../lib/axios";

export const getUserDetails = ({ signal }) =>
  api.get("/superAdmin/profile", { signal });

export const updateBasicInfo = (data) =>
  api.put("/superAdmin/profile/basic-info", data);

export const updateQualificationInfo = (data) =>
  api.put("/superAdmin/profile/qualification-info", data);

export const getJobseekersList = (params = {}) =>
  api.get("/admin/jobseekers/list", { params });

export const getCandidateDetails = async (jobseekerId, { signal } = {}) => {
  const response = await api.get(`/admin/jobseekers/${jobseekerId}`, {
    signal,
  });
  return response.data;
};

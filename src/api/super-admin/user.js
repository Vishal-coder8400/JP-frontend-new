import api from "../../lib/axios";

export const getUserDetails = async ({ signal } = {}) => {
  const response = await api.get("/superAdmin/profile", { signal });
  return response.data;
};

export const updateBasicInfo = async (data) => {
  const response = await api.put("/superAdmin/profile/basic-info", data);
  return response.data;
};

export const updateQualificationInfo = async (data) => {
  const response = await api.put(
    "/superAdmin/profile/qualification-info",
    data
  );
  return response.data;
};

export const getJobseekersList = async ({ signal, ...params } = {}) => {
  const response = await api.get("/admin/jobseekers/list", {
    signal,
    params,
  });
  return response.data;
};

export const getCandidateDetails = async ({ signal, id } = {}) => {
  const response = await api.get(`/admin/jobseekers/${id}`, {
    signal,
  });
  return response.data;
};

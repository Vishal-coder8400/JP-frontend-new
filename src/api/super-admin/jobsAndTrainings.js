import api from "../../lib/axios";
import { createGetAll, createGetById } from "./baseApi";

export const getAllTrainings = createGetAll("/admin/trainings/list");
export const getTrainingById = createGetById("/admin/trainings");
export const getAllJobs = createGetAll("/admin/jobs/list");
export const getJobById = createGetById("/admin/jobs");

export const getJobApplications = async ({ signal, id, ...params }) => {
  const { dateRange, ...restParams } = params;

  const queryParams = {
    ...restParams,
  };

  if (dateRange?.from) {
    queryParams.dateFrom = new Date(dateRange.from).toISOString().split("T")[0];
  }
  if (dateRange?.to) {
    queryParams.dateTo = new Date(dateRange.to).toISOString().split("T")[0];
  }

  const paramsString = new URLSearchParams(queryParams).toString();
  const baseUrl = `/admin/applications/jobs/${id}?corporateReviewStatus=all`;
  const response = await api.get(
    paramsString ? `${baseUrl}&${paramsString}` : baseUrl,
    {
      signal,
    }
  );
  return response.data;
};

export const getJobsByApplicant = async ({ signal, applicantId }) => {
  const response = await api.get(`/admin/applications/jobs`, {
    signal,
    params: { applicantId },
  });
  return response.data;
};

export const getTrainingApplications = async ({ signal, id, ...params }) => {
  const { dateRange, ...restParams } = params;

  const queryParams = {
    ...restParams,
  };

  if (dateRange?.from) {
    queryParams.dateFrom = new Date(dateRange.from).toISOString().split("T")[0];
  }
  if (dateRange?.to) {
    queryParams.dateTo = new Date(dateRange.to).toISOString().split("T")[0];
  }

  const paramsString = new URLSearchParams(queryParams).toString();
  const response = await api.get(
    `/admin/applications/trainings/${id}?${paramsString}`,
    {
      signal,
    }
  );
  return response.data;
};

export const updateJob = async ({ id, data }) => {
  const response = await api.put(`/admin/jobs/${id}`, data);
  return response.data;
};

export const updateTraining = async ({ id, data }) => {
  const response = await api.put(`/admin/trainings/${id}`, data);
  return response.data;
};

export const updateJobStatus = async ({ id, status }) => {
  const response = await api.patch(`/admin/jobs/${id}/status`, { status });
  return response.data;
};

export const updateTrainingStatus = async ({ id, status }) => {
  const response = await api.patch(`/admin/trainings/${id}/status`, { status });
  return response.data;
};

export const updateJobApplicationStatus = async (applicationId, data) => {
  const response = await api.put(
    `/admin/job-applications/applications/${applicationId}/status`,
    data
  );
  return response.data;
};

export const updateTrainingApplicationStatus = async (applicationId, data) => {
  const response = await api.put(
    `/admin/training-applications/applications/${applicationId}/status`,
    data
  );
  return response.data;
};

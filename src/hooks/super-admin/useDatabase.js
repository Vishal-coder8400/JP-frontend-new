import { useQuery } from "@tanstack/react-query";
import {
  getAllCompanies,
  getAllTrainers,
  getAllRecruiters,
  getAllCandidates,
} from "../../api/super-admin/database";

export const useGetDatabaseCompanies = (params = {}) => {
  const token = localStorage.getItem("token");
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ["database-companies", token, queryParams],
    queryFn: ({ signal }) => getAllCompanies({ signal, ...queryParams }),
    enabled: enabled && !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetDatabaseTrainers = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["database-trainers", token, params],
    queryFn: ({ signal }) => getAllTrainers({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetDatabaseRecruiters = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["database-recruiters", token, params],
    queryFn: ({ signal }) => getAllRecruiters({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetDatabaseCandidates = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["database-candidates", token, params],
    queryFn: ({ signal }) => getAllCandidates({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

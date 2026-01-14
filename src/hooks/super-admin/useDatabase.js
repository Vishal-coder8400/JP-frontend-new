import {
  getAllCompanies,
  getAllTrainers,
  getAllRecruiters,
  getAllCandidates,
} from "../../api/super-admin/database";
import { useBaseListQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetDatabaseCompanies = (params = {}) => {
  const { enabled = true, ...queryParams } = params;

  return useBaseListQuery(
    QUERY_KEYS.database.companies,
    getAllCompanies,
    queryParams,
    { enabled }
  );
};

export const useGetDatabaseTrainers = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.database.trainers, getAllTrainers, params);
};

export const useGetDatabaseRecruiters = (params = {}) => {
  return useBaseListQuery(
    QUERY_KEYS.database.recruiters,
    getAllRecruiters,
    params
  );
};

export const useGetDatabaseCandidates = (params = {}) => {
  return useBaseListQuery(
    QUERY_KEYS.database.candidates,
    getAllCandidates,
    params
  );
};

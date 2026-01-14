import {
  getAllCompanies,
  getCompanyById,
} from "../../api/super-admin/database";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetAllCompanies = (params = {}) => {
  return useBaseListQuery(QUERY_KEYS.companies, getAllCompanies, params);
};

export const useGetCompanyDetails = (id, options = {}) => {
  return useBaseDetailsQuery(QUERY_KEYS.company, getCompanyById, id, options);
};

import { useQuery } from "@tanstack/react-query";
import {
  getAllCompanies,
  getCompanyById,
} from "../../api/super-admin/database";

export const useGetAllCompanies = (params = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-companies", token, params],
    queryFn: ({ signal }) => getAllCompanies({ signal, ...params }),
    enabled: !!token,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (permission denied)
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      // Use default retry logic for other errors
      return failureCount < 3;
    },
  });
};

export const useGetCompanyDetails = (id, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-company", token, id],
    queryFn: ({ signal }) => getCompanyById({ signal, id }),
    enabled: enabled && !!id && !!token,
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (permission denied)
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      // Use default retry logic for other errors
      return failureCount < 3;
    },
  });
};

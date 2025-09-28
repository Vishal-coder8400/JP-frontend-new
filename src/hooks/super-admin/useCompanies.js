import { useQuery } from "@tanstack/react-query";
import {
  getAllCompanies,
  getCompanyById,
} from "../../api/super-admin/database";

export const useGetAllCompanies = (params = {}) => {
  return useQuery({
    queryKey: ["superAdmin-companies", params],
    queryFn: ({ signal }) => getAllCompanies({ signal, ...params }),
    keepPreviousData: true,
  });
};

export const useGetCompanyDetails = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-company", id],
    queryFn: ({ signal }) => getCompanyById({ signal, id }),
    enabled: enabled && !!id,
  });
};

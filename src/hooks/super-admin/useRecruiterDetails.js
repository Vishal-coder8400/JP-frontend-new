import { useQuery } from "@tanstack/react-query";
import { getRecruiterById } from "../../api/super-admin/database";

export const useRecruiterDetails = (recruiterId, { enabled = true } = {}) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["superAdmin-recruiter-details", token, recruiterId],
    queryFn: ({ signal }) => getRecruiterById({ signal, id: recruiterId }),
    enabled: enabled && !!recruiterId && !!token,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import tokenService from "../../services/super-admin/tokenService";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";
import { handleMutationError } from "../../services/super-admin/errorHandler";
import { createQueryConfig } from "../../services/super-admin/queryConfigFactory";
import { getUserDetails } from "../../api/super-admin/user";

export const useGetSuperAdminProfile = ({ enabled = true } = {}) => {
  const token = tokenService.getToken();
  const navigate = useNavigate();

  const config = createQueryConfig({ enabled });

  return useQuery({
    queryKey: QUERY_KEYS.profile(token),
    queryFn: ({ signal }) => getUserDetails({ signal }),
    ...config,
    onError: (error) => {
      handleMutationError(error, "Session expired. Please login again.");
      navigate("/super-admin/log-in");
    },
  });
};

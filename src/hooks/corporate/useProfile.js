import useAuthStore from "../../stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import {
  getCorporateProgressDetails,
  getCorporateUserDetails,
} from "../../api/corporate/user";

export const useGetCorporateUserProfile = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: ({ signal }) => getCorporateUserDetails({ signal }),
    enabled: !!token,
  });
};

export const useCorporateProfileProgress = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["corporate-profile-progress", token],
    queryFn: ({ signal }) => getCorporateProgressDetails({ signal }),
    enabled: !!token,
    retry: false,
  });
};

import useAuthStore from "../../stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getCorporateUserDetails } from "../../api/corporate/user";

export const useGetCorporateUserProfile = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: ({ signal }) => getCorporateUserDetails({ signal }),
    enabled: !!token,
  });
};

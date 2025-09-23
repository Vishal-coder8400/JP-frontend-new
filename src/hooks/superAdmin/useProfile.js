import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../api/super-admin/user";
import useAuthStore from "../../stores/useAuthStore";

export const useGetUserProfile = ({ enabled = true } = {}) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["superAdmin-user-profile", token],
    queryFn: ({ signal }) => getUserDetails({ signal }),
    enabled: false, // Temporarily disabled to prevent loading issues
    onError: (error) => {
      console.error("Super admin profile fetch error:", error);
      // Navigate to login on authentication error
      navigate("/super-admin/log-in");
    },
  });
};

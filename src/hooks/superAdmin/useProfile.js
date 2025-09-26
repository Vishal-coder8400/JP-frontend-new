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
    enabled: enabled && !!token, // Only fetch if enabled and token exists
    onSuccess: (data) => {
      console.log("Super admin profile fetch success:", data);
    },
    onError: (error) => {
      console.error("Super admin profile fetch error:", error);
      console.error("Error details:", error.response?.data);
      // Navigate to login on authentication error
      navigate("/super-admin/log-in");
    },
  });
};

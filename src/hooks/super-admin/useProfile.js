import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stores/useAuthStore";
import { toast } from "sonner";

export const useGetSuperAdminProfile = ({ enabled = true } = {}) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["superAdmin-user-profile", token],
    // queryFn: ({ signal }) => getUserDetails({ signal }),
    enabled: enabled && !!token,
    onError: (error) => {
      toast.error("Session expired. Please login again.");
      navigate("/super-admin/log-in");
    },
  });
};

import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getCorporateUserDetails } from "../../api/corporate/user";
import { toast } from "sonner";

export const useGetCorporateUserProfile = ({ enabled = true } = {}) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: ({ signal }) => getCorporateUserDetails({ signal }),
    enabled: enabled && !!token,
    onError: (error) => {
      toast.error("Session expired. Please login again.");
      navigate("/recruiter/log-in");
    },
  });
};

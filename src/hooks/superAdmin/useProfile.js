import { useNavigate } from "react-router-dom";
import { kycDetails, sectoralDetails } from "../../api/superAdmin/auth";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../api/superAdmin/user";
import useAuthStore from "../../stores/useAuthStore";

export const useKycDetails = () => {
  const navigate = useNavigate();
  const { setRefetchProfile } = useAuthStore();
  return useMutation({
    mutationFn: kycDetails,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setRefetchProfile(true);
      navigate("/congratulation");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useSectoralDetails = () => {
  const navigate = useNavigate();
  const { setRefetchProfile } = useAuthStore();
  return useMutation({
    mutationFn: sectoralDetails,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      setRefetchProfile(true);
      if (variables.sectorSpecialization) {
        navigate("/superAdmin/profile-setup/qualification-details");
      } else {
        navigate("/superAdmin/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useGetUserProfile = ({ enabled = true } = {}) => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["superAdmin-user-profile", token],
    queryFn: ({ signal }) => getUserDetails({ signal }),
    enabled: false, // Disabled for development - no auth required
    onError: (error) => {
      // Commented out for development
      // toast.error("Session expired. Please login again.");
      // navigate("/superAdmin/log-in");
    },
  });
};

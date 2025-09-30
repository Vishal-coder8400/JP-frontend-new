import { useNavigate } from "react-router-dom";
import { kycDetails, sectoralDetails } from "../../api/recruiter/auth";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails, getUserProgress } from "../../api/recruiter/user";
import useAuthStore from "../../stores/useAuthStore";
import { useApproval } from "../common/useApproval";

export const useKycDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycDetails,
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/congratulation");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useSectoralDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: approve } = useApproval();
  return useMutation({
    mutationFn: sectoralDetails,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      approve({
        type: "recruiter",
        applicantId: data?.data?.data?._id,
        applicantType: "recruiter",
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      if (variables.sectorSpecialization) {
        navigate("/recruiter/profile-setup/qualification-details");
      } else {
        navigate("/recruiter/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useGetUserProfile = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: ({ signal }) => getUserDetails({ signal }),
    enabled: !!token,
    retry: false,
  });
};

export const useGetUserProgress = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-progress", token],
    queryFn: ({ signal }) => getUserProgress({ signal }),
    enabled: !!token,
    retry: false,
  });
};

import useAuthStore from "../../stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCorporateProgressDetails,
  getCorporateUserDetails,
  updateCorporateUserDetails,
} from "../../api/corporate/user";
import { use } from "react";
import { toast } from "sonner";

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
export const useUpdateCorporateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCorporateUserDetails,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

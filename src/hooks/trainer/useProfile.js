import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stores/useAuthStore";
import {
  getTrainerProfile,
  getTrainerProgress,
} from "../../api/trainer/profile";

export const useGetTrainerProfile = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: getTrainerProfile,
    enabled: !!token,
    retry: false,
  });
};
export const useGetTrainerProgress = () => {
  return useQuery({
    queryKey: ["trainer-profile-progress"],
    queryFn: getTrainerProgress,
    retry: false,
  });
};

export const useTrainerStage4 = (options = {}) => {
  return useMutation({
    mutationFn: (data) => trainerStage4(data),
    onSuccess: (data) => {
      toast.success("Profile completed successfully!");
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit stage 4");
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};

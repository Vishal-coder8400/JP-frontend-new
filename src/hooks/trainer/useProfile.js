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

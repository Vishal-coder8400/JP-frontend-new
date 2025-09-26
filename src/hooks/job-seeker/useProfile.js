import { useQuery } from "@tanstack/react-query";
import {
  getJobSeekerProfile,
  jobSeekerProfileProgress,
} from "../../api/job-seeker/profile";
import useAuthStore from "../../stores/useAuthStore";

export const useGetJobseekerProfile = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: getJobSeekerProfile,
    enabled: !!token,
    retry: false,
  });
};
export const useJobseekerProfileProgress = () => {
  return useQuery({
    queryKey: ["jobseeker-profile-progress"],
    queryFn: jobSeekerProfileProgress,
    retry: false,
  });
};

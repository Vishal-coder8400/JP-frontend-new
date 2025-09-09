import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createJobSeeker,
  getAllApplicantDetails,
  updateJobSeeker,
} from "../../api/recruiter/applicant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";

export const useGetAllApplicant = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: ({ signal }) => getAllApplicantDetails({ signal }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useCreateApplicant = () => {
  const navigate = useNavigate();
  const { setJobSeekerProfile } = useJobSeekerProfileStore();
  return useMutation({
    mutationFn: createJobSeeker,
    onSuccess: (data) => {
      toast.success(data.data.message);
      localStorage.setItem("seekerID", data.data.data._id);
      setJobSeekerProfile(data.data.data);
      navigate("/recruiter/candidates/relevent-details");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useUpdateApplicant = () => {
  const navigate = useNavigate();
  const { setJobSeekerProfile } = useJobSeekerProfileStore();
  return useMutation({
    mutationFn: ({ id, data }) => updateJobSeeker({ id, data }),
    onSuccess: (data) => {
      toast.success(data.data.message);
      localStorage.removeItem("seekerID");
      setJobSeekerProfile(data.data.data);
      navigate("/recruiter/candidates");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

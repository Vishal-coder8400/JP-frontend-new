import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createJobSeeker,
  getAllApplicantDetails,
  getApplicantsById,
  updateJobSeeker,
} from "../../api/recruiter/applicant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";

export const useGetAllApplicant = (filters) => {
  return useQuery({
    queryKey: ["applicants", filters],
    queryFn: getAllApplicantDetails,
    retry: false,
    keepPreviousData: true,
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

export const useGetApplicantById = (id) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: ({ signal }) => getApplicantsById({ id, signal }),
    enabled: !!id,
    retry: false,
  });
};

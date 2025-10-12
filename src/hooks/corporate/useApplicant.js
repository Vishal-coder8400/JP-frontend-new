import {
  getApplicantCorporateDetails,
  getApplicantsById,
  updateStatusOfApplicant,
} from "@/api/corporate/applicant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetApplicantById = (id) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: ({ signal }) => getApplicantsById({ id, signal }),
    enabled: !!id,
    retry: false,
  });
};

export const useUpdateStatusOfApplicant = () => {
  return useMutation({
    mutationKey: ["updateApplicantStatus"],
    mutationFn: updateStatusOfApplicant,
    onSuccess: () => {
      toast.success("Applicant status updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update applicant status"
      );
    },
  });
};


export const useGetApplicantCorporateDetails = () => {
  return useQuery({
    queryKey: ["applicantCorporateDetails"],
    queryFn: () => getApplicantCorporateDetails(),
    retry: false,
  });
};

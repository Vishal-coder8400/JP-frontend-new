import api from "@/lib/axios";

export const getApplicantsById = async ({ id, signal }) => {
  const response = await api.get(`/corporate/jobseeker/${id}`, { signal });
  return response.data;
};

export const updateStatusOfApplicant = async ({
  id,
  status,
  notes,
  feedback,
  stage,
}) => {
  const response = await api.patch(`/corporate/applications/${id}/status`, {
    status,
    notes,
    feedback,
    stage,
  });
  return response.data;
};
export const getApplicantCorporateDetails = async () => {
  const response = await api.get(`/corporate/applications/jobs`);
  return response.data;
};

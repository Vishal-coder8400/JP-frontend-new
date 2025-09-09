import api from "../../lib/axios";

export const getAllSectoralOptions = async ({ signal }) => {
  const response = await api.get("/api/v1/recruiter/sector-specialization", {
    signal,
  });
  return response.data.data.map((sector) => ({
    id: sector._id, // adjust keys based on your backend
    label: sector.name,
  }));
};

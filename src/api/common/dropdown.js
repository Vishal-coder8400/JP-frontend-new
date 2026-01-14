import api from "@/lib/axios";

export const dropDown = async (dropdownId) => {
  const result = await api.get(`/dropdowns/${dropdownId}/values`);
  return result.data;
};

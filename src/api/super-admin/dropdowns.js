import api from "../../lib/axios";

export const getDropdowns = async ({ signal }) => {
  try {
    const response = await api.get("/api/v1/admin/dropdowns", {
      signal,
    });
    return response.data;
  } catch (error) {
    console.error("Dropdowns API error:", error);
    throw error;
  }
};

export const getDropdownValues = async ({ queryKey, signal }) => {
  try {
    const [, dropdownId] = queryKey;
    const response = await api.get(`/api/v1/dropdowns/${dropdownId}/values`, {
      signal,
    });
    return response.data;
  } catch (error) {
    console.error("Dropdown values API error:", error);
    throw error;
  }
};

export const createDropdownValue = async (dropdownId, payload) => {
  try {
    console.log("Creating dropdown value with dropdownId:", dropdownId);
    console.log("Payload:", payload);

    const url = `/api/v1/admin/dropdowns/${dropdownId}/values`;
    console.log("API URL:", url);

    const response = await api.post(url, payload);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create dropdown value API error:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

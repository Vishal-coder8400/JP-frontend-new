import api from "../../lib/axios";

export const getDropdowns = async ({ signal }) => {
  try {
    const response = await api.get("/admin/dropdowns", {
      signal,
      params: { isActive: true },
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
    const response = await api.get(`/dropdowns/${dropdownId}/values`, {
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
    const response = await api.post(
      `/admin/dropdowns/${dropdownId}/values`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Create dropdown value API error:", error);
    throw error;
  }
};

export const updateDropdownValue = async (dropdownId, payload) => {
  try {
    const response = await api.put(
      `/admin/dropdowns/${dropdownId}/values`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Update dropdown value API error:", error);
    throw error;
  }
};

export const deleteDropdownValue = async (dropdownId, value) => {
  try {
    const response = await api.delete(`/admin/dropdowns/${dropdownId}/values`, {
      data: { value },
    });
    return response.data;
  } catch (error) {
    console.error("Delete dropdown value API error:", error);
    throw error;
  }
};

export const createDropdown = async (payload) => {
  try {
    const response = await api.post("/admin/dropdowns", payload);
    return response.data;
  } catch (error) {
    console.error("Create dropdown API error:", error);
    throw error;
  }
};

export const updateDropdown = async (dropdownId, payload) => {
  try {
    const response = await api.put(`/admin/dropdowns/${dropdownId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Update dropdown API error:", error);
    throw error;
  }
};

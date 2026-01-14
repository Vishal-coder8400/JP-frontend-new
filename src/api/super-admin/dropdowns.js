import api from "../../lib/axios";

export const getDropdowns = async ({ signal }) => {
  const response = await api.get("/admin/dropdowns", {
    signal,
    params: { isActive: true },
  });
  return response.data;
};

export const getDropdownValues = async ({ signal, id }) => {
  const response = await api.get(`/dropdowns/${id}/values`, {
    signal,
  });
  return response.data;
};

export const createDropdownValue = async (dropdownId, payload) => {
  const response = await api.post(
    `/admin/dropdowns/${dropdownId}/values`,
    payload
  );
  return response.data;
};

export const updateDropdownValue = async (dropdownId, payload) => {
  const response = await api.put(
    `/admin/dropdowns/${dropdownId}/values`,
    payload
  );
  return response.data;
};

export const deleteDropdownValue = async (dropdownId, value) => {
  const response = await api.delete(`/admin/dropdowns/${dropdownId}/values`, {
    data: { value },
  });
  return response.data;
};

export const createDropdown = async (payload) => {
  const response = await api.post("/admin/dropdowns", payload);
  return response.data;
};

export const updateDropdown = async (dropdownId, payload) => {
  const response = await api.put(`/admin/dropdowns/${dropdownId}`, payload);
  return response.data;
};

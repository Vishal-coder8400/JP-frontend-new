import api from "../../lib/axios";

export const getSectoralOptions = ({ signal }) =>
  api.get("/api/v1/superAdmin/sectoral-options", { signal });

export const createSectoralOption = (data) =>
  api.post("/api/v1/superAdmin/sectoral-options", data);

export const updateSectoralOption = ({ id, data }) =>
  api.put(`/api/v1/superAdmin/sectoral-options/${id}`, data);

export const deleteSectoralOption = (id) =>
  api.delete(`/api/v1/superAdmin/sectoral-options/${id}`);

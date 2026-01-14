import api from "../../lib/axios";

export const login = async (data) => {
  const response = await api.post("/admin-management/login", data);
  return response.data;
};

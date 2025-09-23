import api from "../../lib/axios";

export const login = async (data) => {
  try {
    const response = await api.post("/api/v1/admin-management/login", data);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

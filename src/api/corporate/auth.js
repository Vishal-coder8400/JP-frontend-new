import api from "../../lib/axios";

export const login = (credentials) => api.post("/corporate/login", credentials);
export const register = (data) => api.post("/corporate/register", data);

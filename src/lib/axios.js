import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: "https://srv938709.hstgr.cloud/api/v1", // change this
});

// Automatically attach token from Zustand or localStorage
api.interceptors.request.use((config) => {
  // First try to get token from Zustand store
  let token = useAuthStore.getState().token;

  // If not found in store, try localStorage (for super-admin users)
  if (!token) {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn(
      "No token found in auth store or localStorage for request to:",
      config.url
    );
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);

export default api;

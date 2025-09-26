import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  // baseURL: "https://srv938709.hstgr.cloud", // Production API URL
  baseURL: "http://127.0.0.1:8006", // Development API URL
});

// Automatically attach token from Zustand or localStorage
api.interceptors.request.use((config) => {
  // First try to get token from Zustand store
  let token = useAuthStore.getState().token;

  // If not found in store, try localStorage (for super-admin users)
  if (!token) {
    token = localStorage.getItem("token");
  }

  console.log(
    "Axios request interceptor - Token:",
    token ? "Present" : "Missing"
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(
      "Authorization header set:",
      `Bearer ${token.substring(0, 20)}...`
    );
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
    // Commented out for development - no auth required
    // if (status === 401) {
    //   window.location.href = "/unauthorized";
    // }
    return Promise.reject(error);
  }
);

export default api;

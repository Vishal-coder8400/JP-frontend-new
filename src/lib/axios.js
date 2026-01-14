import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: "https://srv938709.hstgr.cloud/api/v1", // change this
  // baseURL: "http://127.0.0.1:8006/api/v1", // change this
});

// Automatically attach token from Zustand or sessionStorage
api.interceptors.request.use((config) => {
  // First try to get token from Zustand store
  let token = useAuthStore.getState().token;

  // If not found in store, try sessionStorage (for super-admin users)
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn(
      "No token found in auth store or sessionStorage for request to:",
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
      // Extract the API error message for better user experience
      const apiMessage = error.response?.data?.message;
      if (apiMessage) {
        // Create a custom error with the API message
        const customError = new Error(apiMessage);
        customError.status = 401;
        customError.response = error.response;
        customError.isApiError = true;
        return Promise.reject(customError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

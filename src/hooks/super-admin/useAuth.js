import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/super-admin/auth";
import tokenService from "../../services/super-admin/tokenService";
import {
  handleMutationError,
  handleMutationSuccess,
  logError,
} from "../../services/super-admin/errorHandler";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      handleMutationSuccess(data?.data, "Logged in successfully!");

      tokenService.setToken(data.data.token);
      tokenService.setUserRole("super-admin");
      tokenService.setUserId(data.data._id);

      // Store profile data if available in login response
      if (data.data.user) {
        tokenService.setProfile(data.data.user);
      }

      setTimeout(() => {
        navigate("/super-admin/database");
      }, 100);
    },
    onError: (error) => {
      logError("Login", error);
      handleMutationError(error, "Login failed");
    },
  });
};

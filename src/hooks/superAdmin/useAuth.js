import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/superAdmin/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated, setRefetchProfile } =
    useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables) => {
      toast.success(data.data.message);
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      setRefetchProfile(true);
      navigate("/superAdmin/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useRegister = () => {
  const { setToken, setRefetchProfile, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setToken(data.data.data.token);
      setIsAuthenticated(true);
      setRefetchProfile(true);
      navigate("/superAdmin/profile-setup/kyc-verification");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};

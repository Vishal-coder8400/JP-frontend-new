import { useNavigate } from "react-router-dom";
import { login, register } from "../../api/corporate/auth";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated, setRefetchProfile } =
    useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      setUser(data.data.data);
      setRefetchProfile(true);
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      navigate("/corporate/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useCorporateRegister = () => {
  const { setToken, setRefetchProfile, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setToken(data.data.data.token);
      setIsAuthenticated(true);
      setRefetchProfile(true);
      navigate("/congratulation");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};

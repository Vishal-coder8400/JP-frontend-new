import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "../../api/recruiter/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated, setUser } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables) => {
      toast.success(data.data.message);
      setUser({ ...data.data.data, role: "recruiter" });
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/recruiter/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setToken, setIsAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setUser({ ...data.data.data, role: "recruiter" });
      setToken(data.data.data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/recruiter/profile-setup/kyc-verification");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};

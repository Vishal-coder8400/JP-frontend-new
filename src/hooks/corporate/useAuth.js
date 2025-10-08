import { useNavigate } from "react-router-dom";
import { login, register, signupStage2 } from "../../api/corporate/auth";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApproval } from "../common/useApproval";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      setUser({ ...data.data.data, role: "corporate" });
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/corporate/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useCorporateRegister = () => {
  const { setToken, setIsAuthenticated, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setToken(data.data.data.token);
      setUser({ ...data.data.data, role: "corporate" });
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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

export const useCorporateSignupStage2 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: approve } = useApproval();
  return useMutation({
    mutationFn: signupStage2,
    onSuccess: (data) => {
      toast.success(data.data.message);
      approve({
        type: "corporate",
        applicantId: data?.data?.data?._id,
        applicantType: "corporate",
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/corporate/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};

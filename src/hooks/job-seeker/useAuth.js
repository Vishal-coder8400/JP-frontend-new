import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  signUpStage1,
  signUpStage2,
  signUpStage3,
  signUpStage4,
  signUpStage5,
} from "../../api/job-seeker/auth";
import { toast } from "sonner";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useRegisterStage1 = () => {
  const { setToken, setIsAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["jobseeker-signup-stage1"],
    mutationFn: signUpStage1,
    onSuccess: (data) => {
      setToken(data.data.data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/job-seeker/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useRegisterStage2 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["jobseeker-signup-stage2"],
    mutationFn: signUpStage2,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/job-seeker/profile-setup/working-details");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useRegisterStage3 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["jobseeker-signup-stage3"],
    mutationFn: signUpStage3,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/job-seeker/profile-setup/certificate-details");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useRegisterStage4 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["jobseeker-signup-stage4"],
    mutationFn: signUpStage4,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/job-seeker/profile-setup/addtional-details");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useRegisterStage5 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["jobseeker-signup-stage5"],
    mutationFn: signUpStage5,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/job-seeker/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables) => {
      toast.success(data.data.message);
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/job-seeker/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

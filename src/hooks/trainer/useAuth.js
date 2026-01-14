import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  trainerLogin,
  trainerRegistrationStage1,
  trainerRegistrationStage2,
  trainerRegistrationStage3,
  trainerRegistrationStage4,
} from "../../api/trainer/auth";
import { toast } from "sonner";
import { useApproval } from "../common/useApproval";

export const useTrainerRegisterationStage1 = () => {
  const { setToken, setIsAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["trainerRegistrationStage1"],
    mutationFn: trainerRegistrationStage1,
    onSuccess: (data) => {
      setToken(data.data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/trainer/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useTrainerRegisterationStage2 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["trainerRegistrationStage2"],
    mutationFn: trainerRegistrationStage2,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/trainer/profile-setup/working-details");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useTrainerRegisterationStage3 = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["trainerRegistrationStage3"],
    mutationFn: trainerRegistrationStage3,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/trainer/profile-setup/certificate-details");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useTrainerRegisterationStage4 = () => {
  const queryClient = useQueryClient();
  const { mutate: approve } = useApproval();
  const navigate = useNavigate();
  return useMutation({
    queryKey: ["trainerRegistrationStage4"],
    mutationFn: trainerRegistrationStage4,
    onSuccess: (data) => {
      approve({
        type: "trainer",
        applicantId: data?.data?._id,
        applicantType: "trainer",
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success(data.data.message);
      navigate("/trainer/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};
export const useTrainerLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useAuthStore();
  return useMutation({
    mutationFn: trainerLogin,
    onSuccess: async (data, variables) => {
      toast.success(data.message);
      setToken(data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/trainer/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

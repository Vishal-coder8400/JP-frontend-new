import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/super-admin/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables) => {
      toast.success(data.data.message);

      // Simple localStorage approach
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userRole", "super-admin");

      // Use setTimeout to ensure localStorage is set before navigation
      setTimeout(() => {
        navigate("/super-admin/database");
      }, 100);
    },
    onError: (error) => {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

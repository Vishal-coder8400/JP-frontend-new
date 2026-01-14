import { useMutation } from "@tanstack/react-query";
import { upload } from "../../api/common/upload";
import { toast } from "sonner";

export const useUpload = () => {
  return useMutation({
    mutationFn: upload,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(message);
    },
  });
};

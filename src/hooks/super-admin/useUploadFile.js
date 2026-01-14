import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../api/super-admin/uploadFile";
import { toast } from "sonner";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "An error occurred during file upload.";
      toast.error(message);
    },
  });
};

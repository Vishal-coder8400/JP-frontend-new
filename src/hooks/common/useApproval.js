import { useMutation } from "@tanstack/react-query";
import { approve } from "../../api/common/approval";

export const useApproval = () => {
  return useMutation({
    mutationFn: approve,
  });
};

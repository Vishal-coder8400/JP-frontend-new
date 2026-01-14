import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approve } from "../../api/common/approval";

export const useApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approve,
    mutationKey: ["approve"],
    onSuccess: () => {
      queryClient.invalidateQueries(["user-profile"]);
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSectoralOptions,
  createSectoralOption,
  updateSectoralOption,
  deleteSectoralOption,
} from "../../api/super-admin/sectoralOption";
import { toast } from "sonner";

export const useGetSectoralOptions = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-sectoral-options"],
    queryFn: ({ signal }) => getSectoralOptions({ signal }),
    enabled,
  });
};

export const useCreateSectoralOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSectoralOption,
    onSuccess: () => {
      toast.success("Sectoral option created successfully");
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-sectoral-options"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create sectoral option"
      );
    },
  });
};

export const useUpdateSectoralOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSectoralOption,
    onSuccess: () => {
      toast.success("Sectoral option updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-sectoral-options"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update sectoral option"
      );
    },
  });
};

export const useDeleteSectoralOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSectoralOption,
    onSuccess: () => {
      toast.success("Sectoral option deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-sectoral-options"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete sectoral option"
      );
    },
  });
};

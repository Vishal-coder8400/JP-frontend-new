import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDropdowns,
  getDropdownValues,
  createDropdownValue,
} from "../../api/super-admin/dropdowns";

export const useGetDropdowns = () => {
  return useQuery({
    queryKey: ["dropdowns"],
    queryFn: getDropdowns,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetDropdownValues = (dropdownId) => {
  return useQuery({
    queryKey: ["dropdownValues", dropdownId],
    queryFn: getDropdownValues,
    enabled: !!dropdownId, // Only run query if dropdownId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateDropdownValue = (dropdownId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createDropdownValue(dropdownId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dropdownValues", dropdownId],
      });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDropdowns,
  getDropdownValues,
  createDropdownValue,
  updateDropdownValue,
  deleteDropdownValue,
  createDropdown,
  updateDropdown,
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

export const useUpdateDropdownValue = (dropdownId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateDropdownValue(dropdownId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dropdownValues", dropdownId],
      });
    },
  });
};

export const useDeleteDropdownValue = (dropdownId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value) => deleteDropdownValue(dropdownId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dropdownValues", dropdownId],
      });
    },
  });
};

export const useCreateDropdown = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createDropdown(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dropdowns"],
      });
    },
  });
};

export const useUpdateDropdown = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dropdownId, payload }) =>
      updateDropdown(dropdownId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dropdowns"],
      });
    },
  });
};

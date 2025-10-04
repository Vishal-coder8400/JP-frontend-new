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
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["dropdowns", token],
    queryFn: ({ signal }) => getDropdowns({ signal }),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useGetDropdownValues = (dropdownId) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["dropdownValues", token, dropdownId],
    queryFn: ({ signal }) => getDropdownValues(dropdownId, { signal }),
    enabled: !!dropdownId && !!token, // Only run query if dropdownId and token exist
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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

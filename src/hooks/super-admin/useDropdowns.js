import {
  getDropdowns,
  getDropdownValues,
  createDropdownValue,
  updateDropdownValue,
  deleteDropdownValue,
  createDropdown,
  updateDropdown,
} from "../../api/super-admin/dropdowns";
import { useBaseListQuery, useBaseDetailsQuery } from "./useBaseQuery";
import { useBaseMutation } from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetDropdowns = () => {
  return useBaseListQuery(
    QUERY_KEYS.dropdowns,
    getDropdowns,
    {},
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  );
};

export const useGetDropdownValues = (dropdownId) => {
  return useBaseDetailsQuery(
    QUERY_KEYS.dropdownValues,
    getDropdownValues,
    dropdownId,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  );
};

export const useCreateDropdownValue = (dropdownId) => {
  return useBaseMutation(
    (payload) => createDropdownValue(dropdownId, payload),
    {
      // Invalidate by prefix to account for token in the query key
      invalidateKeys: [["dropdownValues"]],
      successMessage: "Value added successfully",
    }
  );
};

export const useUpdateDropdownValue = (dropdownId) => {
  return useBaseMutation(
    (payload) => updateDropdownValue(dropdownId, payload),
    {
      // Invalidate by prefix to account for token in the query key
      invalidateKeys: [["dropdownValues"]],
      successMessage: "Value updated successfully",
    }
  );
};

export const useDeleteDropdownValue = (dropdownId) => {
  return useBaseMutation((value) => deleteDropdownValue(dropdownId, value), {
    // Invalidate by prefix to account for token in the query key
    invalidateKeys: [["dropdownValues"]],
    successMessage: "Value deleted successfully",
  });
};

export const useCreateDropdown = () => {
  return useBaseMutation(createDropdown, {
    invalidateKeys: [["dropdowns"]],
  });
};

export const useUpdateDropdown = () => {
  return useBaseMutation(
    ({ dropdownId, payload }) => updateDropdown(dropdownId, payload),
    {
      invalidateKeys: [["dropdowns"]],
    }
  );
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleMutationError,
  handleMutationSuccess,
} from "../../services/super-admin/errorHandler";

export const useBaseMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();

  const {
    successMessage,
    errorMessage,
    invalidateKeys = [],
    onSuccess: customOnSuccess,
    onError: customOnError,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        handleMutationSuccess(data, successMessage);
      }

      invalidateKeys.forEach((key) => {
        if (typeof key === "string") {
          queryClient.invalidateQueries({ queryKey: [key] });
        } else if (Array.isArray(key)) {
          queryClient.invalidateQueries({ queryKey: key });
        } else if (key.prefix) {
          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0]?.toString().startsWith(key.prefix),
          });
        }
      });

      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (errorMessage) {
        handleMutationError(error, errorMessage);
      }

      if (customOnError) {
        customOnError(error, variables, context);
      }
    },
    ...restOptions,
  });
};

export const useCreateMutation = (
  mutationFn,
  entityName,
  invalidateKeys = []
) => {
  return useBaseMutation(mutationFn, {
    successMessage: `${entityName} created successfully`,
    errorMessage: `Failed to create ${entityName.toLowerCase()}`,
    invalidateKeys,
  });
};

export const useUpdateMutation = (
  mutationFn,
  entityName,
  invalidateKeys = []
) => {
  return useBaseMutation(mutationFn, {
    successMessage: `${entityName} updated successfully`,
    errorMessage: `Failed to update ${entityName.toLowerCase()}`,
    invalidateKeys,
  });
};

export const useDeleteMutation = (
  mutationFn,
  entityName,
  invalidateKeys = []
) => {
  return useBaseMutation(mutationFn, {
    successMessage: `${entityName} deleted successfully`,
    errorMessage: `Failed to delete ${entityName.toLowerCase()}`,
    invalidateKeys,
  });
};

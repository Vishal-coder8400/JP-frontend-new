import tokenService from "./tokenService";

export const createQueryConfig = (options = {}) => {
  const {
    staleTime = 0,
    gcTime = 5 * 60 * 1000,
    keepPreviousData = false,
    enabled = true,
    requiresAuth = true,
    customRetry,
  } = options;

  const token = tokenService.getToken();

  const defaultRetry = (failureCount, error) => {
    if (error?.response?.status === 401 || error?.status === 401) {
      return false;
    }
    return failureCount < 3;
  };

  return {
    enabled: requiresAuth ? enabled && !!token : enabled,
    staleTime,
    gcTime,
    keepPreviousData,
    retry: customRetry || defaultRetry,
  };
};

export const createMutationConfig = (options = {}) => {
  const { onSuccess, onError, onSettled } = options;

  return {
    onSuccess,
    onError,
    onSettled,
  };
};

export const DEFAULT_QUERY_CONFIG = {
  list: {
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    keepPreviousData: true,
  },
  details: {
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
  static: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
};

import { useQuery } from "@tanstack/react-query";
import { createQueryConfig } from "../../services/super-admin/queryConfigFactory";
import tokenService from "../../services/super-admin/tokenService";

export const useBaseQuery = (queryKey, queryFn, options = {}) => {
  const token = tokenService.getToken();

  const config = createQueryConfig({
    ...options,
    enabled: options.enabled !== undefined ? options.enabled : true,
  });

  const fullQueryKey =
    typeof queryKey === "function" ? queryKey(token) : queryKey;

  return useQuery({
    queryKey: fullQueryKey,
    queryFn,
    ...config,
  });
};

export const useBaseListQuery = (
  queryKey,
  queryFn,
  params = {},
  options = {}
) => {
  const token = tokenService.getToken();

  const config = createQueryConfig({
    keepPreviousData: true,
    ...options,
  });

  const fullQueryKey =
    typeof queryKey === "function"
      ? queryKey(token, params)
      : [...queryKey, token, params];

  return useQuery({
    queryKey: fullQueryKey,
    queryFn: ({ signal }) => queryFn({ signal, ...params }),
    ...config,
  });
};

export const useBaseDetailsQuery = (queryKey, queryFn, id, options = {}) => {
  const token = tokenService.getToken();

  const config = createQueryConfig({
    staleTime: 2 * 60 * 1000,
    ...options,
    enabled: options.enabled !== false && !!id && !!token,
  });

  const fullQueryKey =
    typeof queryKey === "function"
      ? queryKey(token, id)
      : [...queryKey, token, id];

  return useQuery({
    queryKey: fullQueryKey,
    queryFn: ({ signal }) => queryFn({ signal, id }),
    ...config,
  });
};

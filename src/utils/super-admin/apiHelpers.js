export const normalizeResponse = (response) => {
  if (response?.data) {
    return response.data;
  }
  return response;
};

export const buildQueryParams = (params = {}) => {
  const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});

  return cleanParams;
};

export const buildPaginationParams = ({
  page = 1,
  limit = 10,
  ...rest
} = {}) => {
  return {
    page,
    limit,
    ...buildQueryParams(rest),
  };
};

export const createApiConfig = ({
  signal,
  bustCache = false,
  ...rest
} = {}) => {
  const config = { signal, ...rest };

  if (bustCache) {
    config.headers = {
      ...config.headers,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    };
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
  }

  return config;
};

export const extractDataFromResponse = (response, path = "data") => {
  if (!path) return response;

  const paths = path.split(".");
  let result = response;

  for (const p of paths) {
    if (result?.[p] !== undefined) {
      result = result[p];
    } else {
      return null;
    }
  }

  return result;
};

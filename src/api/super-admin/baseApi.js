import api from "../../lib/axios";
import {
  buildPaginationParams,
  createApiConfig,
} from "../../utils/super-admin/apiHelpers";

export const createGetAll = (endpoint) => {
  return async ({ signal, page = 1, limit = 10, ...params } = {}) => {
    const queryParams = buildPaginationParams({ page, limit, ...params });
    const response = await api.get(endpoint, {
      signal,
      params: queryParams,
    });
    return response.data;
  };
};

export const createGetById = (endpoint) => {
  return async ({ signal, id, bustCache = false } = {}) => {
    const config = createApiConfig({ signal, bustCache });
    const response = await api.get(`${endpoint}/${id}`, config);
    return response.data;
  };
};

export const createPost = (endpoint) => {
  return async (data) => {
    const response = await api.post(endpoint, data);
    return response.data;
  };
};

export const createUpdate = (endpoint) => {
  return async ({ id, data }) => {
    const response = await api.put(`${endpoint}/${id}/profile`, data);
    return response.data;
  };
};

export const createPatch = (endpoint) => {
  return async ({ id, data }) => {
    const response = await api.patch(`${endpoint}/${id}`, data);
    return response.data;
  };
};

export const createDelete = (endpoint) => {
  return async (id) => {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  };
};

export const createUpload = (endpoint) => {
  return async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };
};

export const apiFactory = {
  getAll: createGetAll,
  getById: createGetById,
  post: createPost,
  update: createUpdate,
  patch: createPatch,
  delete: createDelete,
  upload: createUpload,
};

export default apiFactory;

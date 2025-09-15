import api from "./api";
import { makeApiPath } from "./apiConfig";

interface FetchAllOptions {
  page?: number;
  limit?: number;
}

export const makeApiService = (module: string) => {
  const BASE = makeApiPath(module);

  return {
    create: (data: any) =>
      api.post(`${BASE}/create-${module}`, data).then(res => res.data),

    fetchAll: ({ page = 1, limit = 10 }: FetchAllOptions = {}) =>
      api
        .get(`${BASE}/getAll${capitalize(module)}s?page=${page}&limit=${limit}`)
        .then(res => res.data),

    fetchById: (id: string) =>
      api.get(`${BASE}/get${capitalize(module)}ById/${id}`).then(res => res.data),

    update: (id: string, data: any) =>
      api.put(`${BASE}/update-${module}/${id}`, data).then(res => res.data),

    delete: (id: string) =>
      api.delete(`${BASE}/delete-${module}/${id}`).then(res => res.data),
  };
};

// Helper to capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

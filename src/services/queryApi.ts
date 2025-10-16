import { QueryFilters } from "../types/query";
import { QueryFormValues } from "../utils/validations/FormValidation";
import api from "./api";

// ✅ Fetch all queries with pagination
export const fetchAllQueries = async (page: number = 1, limit: number = 10, filters?: QueryFilters) => {

  const params: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };

  if (filters?.formType && filters.formType !== "all") {
    params.formType = filters.formType;
  }

  if (filters?.isViewed && filters.isViewed !== "all") {
    params.isViewed = filters.isViewed;
  }

  const queryString = new URLSearchParams(params).toString();

  const { data } = await api.get(`/admin/form/getAllForms?${queryString}`);
  return data;
};

// ✅ Fetch a single query by ID
export const fetchQueryById = async (id: string) => {
  const { data } = await api.get(`/admin/form/getFormById/${id}`);
  return data;
};

// ✅ Update query (e.g., mark as viewed)
export const updateQuery = async (
  id: string,
  values: Partial<QueryFormValues>
) => {
  const { data } = await api.put(`/form/moderate-form/${id}`, values);
  return data;
};

// ✅ Delete query
export const deleteQuery = async (id: string) => {
  const { data } = await api.delete(`/query/delete-query/${id}`);
  return data;
};

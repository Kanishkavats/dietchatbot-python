import { QueryFormValues } from "../utils/validations/FormValidation";
import api from "./api";

// ✅ Fetch all queries with pagination
export const fetchAllQueries = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/form/getAllForms?page=${page}&limit=${limit}`);
  return data;
};

// ✅ Fetch a single query by ID
export const fetchQueryById = async (id: string) => {
  console.log("api check", id)
  const { data } = await api.get(`/form/getFormById/cac4819b-61ca-45c3-9545-cd331430272c`);
  return data;
};

// ✅ Update query (e.g., mark as viewed)
export const updateQuery = async (
  id: string,
  values: Partial<QueryFormValues>
) => {
  const { data } = await api.put(`/form/update-query/${id}`, values);
  return data;
};

// ✅ Delete query
export const deleteQuery = async (id: string) => {
  const { data } = await api.delete(`/query/delete-query/${id}`);
  return data;
};

// src/services/categoryApi.ts
import api from "./api";



// ✅ Fetch all categories

export const fetchCategory = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/category/get-category?page=${page}&limit=${limit}`);
  return data;
};
export const fetchCategoryById = async (id:string) => {
  const { data } = await api.get(`/category/get-category/${id}`);
  return data;
};

// ✅ Create a new category
export const createCategory = async (category: { name: string }) => {
  const { data } = await api.post("/category/create-category", category);
  return data;
};

// ✅ Update a category
export const updateCategory = async (id: string, category: { name: string }) => {
  const { data } = await api.put(`/category/update-category/${id}`, category);
  return data;
};

// ✅ Delete a category
export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/category/delete-category/${id}`);
  return data;
};

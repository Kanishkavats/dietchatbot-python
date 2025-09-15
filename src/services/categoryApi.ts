// src/services/categoryApi.ts
import api from "./api";



// ✅ Fetch all categories
export const fetchCategory = async () => {
  const { data } = await api.get("/api/V1/category/get-category");
  return data;
};

// ✅ Create a new category
export const createCategory = async (category: { name: string }) => {
  console.log("check", category);
  const { data } = await api.post("/api/V1/category/create-category", category);
  console.log("error", data);
  return data;
};

// ✅ Update a category
export const updateCategory = async (id: string, category: { name: string }) => {
  const { data } = await api.put(`/api/V1/category/update-category/${id}`, category);
  return data;
};

// ✅ Delete a category
export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/api/V1/category/delete-category/${id}`);
  return data;
};

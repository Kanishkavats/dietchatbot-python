// src/services/categoryApi.ts
import api from "../../../services/api";



// ✅ Fetch all categories

// export const fetchCategory = async (page: number = 1, limit: number = 10) => {
//   const { data } = await api.get(`/admin/category/get-category?page=${page}&limit=${limit}`);
//   return data;
// };
export const fetchCategory = async (page?: number, limit?: number) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", String(page));
  if (limit !== undefined) params.append("limit", String(limit));
  console.log(page,limit)
  const query = params.toString() ? `?${params.toString()}` : "";
  const { data } = await api.get(`/admin/category/get-category${query}`);
  console.log(data)
  return data;
};
export const fetchCategoryById = async (id:string) => {
  const { data } = await api.get(`/admin/category/getCategoryById/${id}`);
  return data;
};

// ✅ Create a new category
export const createCategory = async (category: { name: { en: string; hi: string } }) => {
  const { data } = await api.post("/admin/category/create-category", category);
  return data;
};

// ✅ Update a category
export const updateCategory = async (id: string, category: { name: { en: string; hi: string } }) => {
  const { data } = await api.put(`/admin/category/update-category/${id}`, category);
  return data;
};

// ✅ Delete a category
export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/admin/category/delete-category/${id}`);
  return data;
};

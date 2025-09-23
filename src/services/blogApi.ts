// src/services/blogApi.ts
import { BlogFormValues } from "../utils/validations/FormValidation";
import api from "./api";

// ✅ Create a blog
export const createBlog = async (blog: BlogFormValues) => {
  const { data } = await api.post("/api/V1/blog/create-blog", blog);
  return data;
};

// ✅ Get all blogs with pagination
export const fetchAllBlogs = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/api/V1/blog/getAllBlogs?page=${page}&limit=${limit}`);
  console.log(data);
  return data;
};

// ✅ Get single blog by ID
export const fetchBlogById = async (id: string) => {  
  const { data } = await api.get(`/api/V1/blog/getBlogById/${id}`);
  console.log(data)
  return data;
};

// ✅ Update blog
export const updateBlog = async (id: string, blog: Partial<BlogFormValues>) => {
  const { data } = await api.put(`/api/V1/blog/update-blog/${id}`, blog);
  return data;
};

// ✅ Delete blog
export const deleteSingleBlog = async (id: string) => {
  const { data } = await api.delete(`/api/V1/blog/delete-blog/${id}`);
  return data;
};

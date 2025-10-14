// src/services/blogApi.ts
import { BlogFormValues } from "../utils/validations/FormValidation";
import api from "./api";

// ✅ Create a blog
export const createBlog = async (blog: BlogFormValues) => {
  const { data } = await api.post("/blog/create-blog", blog);
  return data;
};

// ✅ Get all blogs with pagination
export const fetchAllBlogs = async (page: number = 1, limit: number = 10,searchText?:string) => {
  const { data } = await api.get(`/web/blog/getAllBlogs?page=${page}&limit=${limit}&search=${searchText}`);
  return data;
};

// ✅ Get single blog by ID
export const fetchBlogById = async (id: string) => {  
  const { data } = await api.get(`/web/blog/getBlogById/${id}`);
  return data;
};

// ✅ Update blog
export const updateBlog = async (id: string, blog: Partial<BlogFormValues>) => {
  const { data } = await api.put(`/blog/update-blog/${id}`, blog);
  return data;
};

// ✅ Delete blog
export const deleteSingleBlog = async (id: string) => {
  const { data } = await api.delete(`/blog/delete-blog/${id}`);
  return data;
};

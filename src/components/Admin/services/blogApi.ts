// src/services/blogApi.ts
import { BlogFormValues } from "../../../utils/validations/FormValidation";
import api from "../../../services/api";

// ✅ Create a blog
export const createBlog = async (blog: FormData) => {
  const { data } = await api.post("/blog/create-blog", blog, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// ✅ Get all blogs with pagination
export const fetchAllBlogs = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/blog/getAllBlogs?page=${page}&limit=${limit}`);
  return data;
};

// ✅ Get single blog by ID
export const fetchBlogById = async (id: string) => {  
  const { data } = await api.get(`/blog/getBlogById/${id}`);
  return data;
};

// ✅ Update blog
export const updateBlog = async (id: string, blog: FormData) => {
  const { data } = await api.put(`/blog/update-blog/${id}`, blog, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// ✅ Delete blog
export const deleteSingleBlog = async (id: string) => {
  const { data } = await api.delete(`/blog/delete-blog/${id}`);
  return data;
};

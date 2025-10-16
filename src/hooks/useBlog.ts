// src/hooks/useBlogs.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchAllBlogs, fetchBlogById} from "../services/blogApi";

// ✅ Fetch blogs with pagination
export const useFetchAllBlogs = (page: number, limit: number = 10,searchText='All') => {
  return useQuery({
    queryKey: ["blogs", page, limit,searchText],
    queryFn: () => fetchAllBlogs(page, limit,searchText),
    placeholderData: keepPreviousData,
  });
};

// Fetch single blog
export const useFetchSingleBlog = (id?: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });
};



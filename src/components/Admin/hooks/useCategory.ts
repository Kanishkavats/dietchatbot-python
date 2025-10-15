// src/hooks/useCategory.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCategory, deleteCategory, fetchCategory, updateCategory } from "@/src/components/Admin/services/categoryApi";


// ======================= Fetch Categories ======================= //
export const useFetchCategory = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["categories",page, limit],
    queryFn: ()=> fetchCategory(page, limit),
  });
};

export const useFetchCategoryById = (id:string) => {
  return useQuery({
    queryKey: ["categories",id],
    queryFn: ()=> fetchCategory(id),
  });
};

// ======================= Create Category ======================= //
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response.data.message || "Failed to create category");
    },
  });
};

// ======================= Update Category ======================= //
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update category");
    },
  });

};

// ======================= Delete Category ======================= //
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response.data.message || "Failed to delete category");
    },
  });
};
